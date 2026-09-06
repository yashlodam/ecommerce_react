import { normalizeApiError } from "./errorNormalizer";

const MAX_VISIBLE_TOASTS = 3;
const DEDUPE_WINDOW_MS = 1500;

export const DEFAULT_DURATIONS = {
  success: 3500,
  info: 3500,
  warning: 4500,
  error: 6000,
  loading: Infinity,
};

let toastIdCounter = 0;
let toasts = [];
let listeners = new Set();
const timers = new Map(); // id -> { timeoutId, startTime, remainingTime }

function generateId() {
  toastIdCounter += 1;
  return `toast-${Date.now()}-${toastIdCounter}`;
}

function notify() {
  const currentToasts = [...toasts];
  listeners.forEach((listener) => {
    try {
      listener(currentToasts);
    } catch (err) {
      console.error("[ToastStore] Listener error:", err);
    }
  });
}

function clearTimer(id) {
  if (timers.has(id)) {
    const timer = timers.get(id);
    if (timer.timeoutId) {
      clearTimeout(timer.timeoutId);
    }
    timers.delete(id);
  }
}

function startTimer(id, duration) {
  clearTimer(id);
  if (!duration || duration === Infinity || duration <= 0) return;

  const timer = {
    duration,
    remainingTime: duration,
    startTime: Date.now(),
    timeoutId: null,
  };

  timer.timeoutId = setTimeout(() => {
    dismissToast(id);
  }, duration);

  timers.set(id, timer);
}

export function subscribeToToasts(listener) {
  listeners.add(listener);
  listener([...toasts]);
  return () => {
    listeners.delete(listener);
  };
}

export function getActiveToasts() {
  return [...toasts];
}

export function pauseAllToasts() {
  const now = Date.now();
  timers.forEach((timer, id) => {
    if (timer.timeoutId) {
      clearTimeout(timer.timeoutId);
      timer.timeoutId = null;
      const elapsed = now - timer.startTime;
      timer.remainingTime = Math.max(0, timer.remainingTime - elapsed);
    }
  });
}

export function resumeAllToasts() {
  timers.forEach((timer, id) => {
    if (timer.remainingTime > 0 && !timer.timeoutId) {
      timer.startTime = Date.now();
      timer.timeoutId = setTimeout(() => {
        dismissToast(id);
      }, timer.remainingTime);
    }
  });
}

export function dismissToast(id) {
  clearTimer(id);
  const index = toasts.findIndex((t) => t.id === id);
  if (index !== -1) {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  }
}

export function dismissAllToasts() {
  timers.forEach((_, id) => clearTimer(id));
  toasts = [];
  notify();
}

export function updateToast(id, updates = {}) {
  const index = toasts.findIndex((t) => t.id === id);
  if (index === -1) return;

  const oldToast = toasts[index];
  const newType = updates.type || oldToast.type || "info";
  const newDuration =
    updates.duration !== undefined
      ? updates.duration
      : DEFAULT_DURATIONS[newType] ?? 3500;

  const updatedToast = {
    ...oldToast,
    ...updates,
    type: newType,
    duration: newDuration,
    updatedAt: Date.now(),
  };

  toasts = [
    ...toasts.slice(0, index),
    updatedToast,
    ...toasts.slice(index + 1),
  ];

  startTimer(id, newDuration);
  notify();
}

/**
 * Core dispatch function
 */
export function addToast(message, options = {}) {
  const {
    type = "info",
    title = null,
    duration = DEFAULT_DURATIONS[type] ?? 3500,
    action = null,
    id: customId = null,
    dedupe = true,
  } = options;

  const resolvedMessage =
    typeof message === "string" ? message.trim() : String(message || "");

  if (!resolvedMessage && !title) return null;

  // Deduplication check: Within DEDUPE_WINDOW_MS, don't duplicate identical messages
  if (dedupe) {
    const now = Date.now();
    const existingIndex = toasts.findIndex(
      (t) =>
        t.type === type &&
        t.message === resolvedMessage &&
        now - t.createdAt < DEDUPE_WINDOW_MS
    );

    if (existingIndex !== -1) {
      const existing = toasts[existingIndex];
      const newCount = (existing.duplicateCount || 1) + 1;

      // Refresh timer and increment counter
      toasts[existingIndex] = {
        ...existing,
        duplicateCount: newCount,
        createdAt: now,
      };

      startTimer(existing.id, duration);
      notify();
      return existing.id;
    }
  }

  const id = customId || generateId();

  const newToast = {
    id,
    type,
    title,
    message: resolvedMessage,
    duration,
    action,
    createdAt: Date.now(),
    duplicateCount: 1,
  };

  // Enforce MAX_VISIBLE_TOASTS limit (keep critical errors and loading toasts if possible)
  let nextToasts = [...toasts];
  if (nextToasts.length >= MAX_VISIBLE_TOASTS) {
    // Find the oldest non-loading, non-error toast to remove first
    const removeIdx = nextToasts.findIndex(
      (t) => t.type !== "loading" && t.type !== "error"
    );
    if (removeIdx !== -1) {
      clearTimer(nextToasts[removeIdx].id);
      nextToasts.splice(removeIdx, 1);
    } else {
      clearTimer(nextToasts[0].id);
      nextToasts.shift();
    }
  }

  toasts = [...nextToasts, newToast];
  startTimer(id, duration);
  notify();

  return id;
}

/**
 * Universal imperative API
 */
export const toast = (message, options) => addToast(message, options);

toast.success = (message, options = {}) =>
  addToast(message, { ...options, type: "success" });

toast.error = (errorOrMessage, options = {}) => {
  const message =
    typeof errorOrMessage === "string"
      ? errorOrMessage
      : normalizeApiError(errorOrMessage, options.fallback);
  return addToast(message, { ...options, type: "error" });
};

toast.warning = (message, options = {}) =>
  addToast(message, { ...options, type: "warning" });

toast.info = (message, options = {}) =>
  addToast(message, { ...options, type: "info" });

toast.loading = (message, options = {}) =>
  addToast(message, {
    ...options,
    type: "loading",
    duration: Infinity,
    dedupe: false,
  });

toast.dismiss = (id) => dismissToast(id);
toast.dismissAll = () => dismissAllToasts();
toast.update = (id, updates) => updateToast(id, updates);

/**
 * Promise wrapper helper:
 * toast.promise(asyncAction(), {
 *   loading: "Saving product...",
 *   success: "Product saved successfully!",
 *   error: (err) => `Failed to save product: ${err.message}`
 * })
 */
toast.promise = async (promise, messages = {}) => {
  const {
    loading = "Please wait...",
    success = "Operation completed successfully.",
    error = "Operation failed.",
  } = messages;

  const id = toast.loading(loading);

  try {
    const result = await promise;
    const successMsg =
      typeof success === "function" ? success(result) : success;
    toast.update(id, {
      type: "success",
      message: successMsg,
      duration: DEFAULT_DURATIONS.success,
    });
    return result;
  } catch (err) {
    const errorMsg =
      typeof error === "function"
        ? error(err)
        : normalizeApiError(err, typeof error === "string" ? error : undefined);
    toast.update(id, {
      type: "error",
      message: errorMsg,
      duration: DEFAULT_DURATIONS.error,
    });
    throw err;
  }
};
