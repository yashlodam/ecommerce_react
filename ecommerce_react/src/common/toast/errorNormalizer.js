/**
 * ShopSphere API Error Normalizer
 *
 * Sanitizes and normalizes error objects from Axios, backend Spring Boot,
 * network failures, or JavaScript exceptions into human-friendly messages.
 *
 * Never exposes Java stack traces, SQL errors, or internal implementation details.
 */

const TECHNICAL_ERROR_PATTERNS = [
  /com\.zosh\./i,
  /java\./i,
  /org\.springframework\./i,
  /NullPointerException/i,
  /SQLException/i,
  /HibernateException/i,
  /DataIntegrityViolation/i,
  /ConstraintViolation/i,
  /TransactionSystemException/i,
  /InternalServerError/i,
  /SyntaxError/i,
  /TypeError/i,
  /Proxy error/i,
  /ECONNREFUSED/i,
];

/**
 * Checks whether an error string contains sensitive or technical details.
 */
function isTechnicalString(str) {
  if (!str || typeof str !== "string") return false;
  return TECHNICAL_ERROR_PATTERNS.some((pattern) => pattern.test(str));
}

/**
 * Normalizes any error input into a user-friendly string.
 *
 * @param {any} error - Can be an Axios error, string, Error instance, or custom object
 * @param {string} fallback - Safe fallback message if the error cannot be parsed
 * @returns {string} Human-readable message
 */
export function normalizeApiError(error, fallback = "Something went wrong. Please try again.") {
  if (!error) return fallback;

  // 1. If error is a clean string already
  if (typeof error === "string") {
    const trimmed = error.trim();
    if (trimmed.length > 0 && !isTechnicalString(trimmed)) {
      // Clean leading "Error: " if present
      return trimmed.replace(/^error:\s*/i, "");
    }
    return fallback;
  }

  // 2. Network connectivity error (no response received)
  if (error.code === "ERR_NETWORK" || error.message === "Network Error" || (!error.response && error.request)) {
    return "Unable to reach ShopSphere servers. Please check your internet connection.";
  }

  // 3. Timeout error
  if (error.code === "ECONNABORTED" || error.message?.toLowerCase().includes("timeout")) {
    return "The server took too long to respond. Please try again.";
  }

  // 4. HTTP Response Error from Backend
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    // Check if backend returned a specific user-facing message
    let backendMsg = "";
    if (typeof data === "string") {
      backendMsg = data;
    } else if (data && typeof data === "object") {
      backendMsg = data.message || data.error || data.detail || "";
    }

    // If backend message is safe and non-technical, use it for 4xx errors
    if (backendMsg && !isTechnicalString(backendMsg) && status < 500) {
      return backendMsg.trim();
    }

    // Otherwise use standard semantic HTTP status messages
    switch (status) {
      case 400:
        return "Invalid request. Please verify the information entered and try again.";
      case 401:
        return "Your session has expired. Please sign in again to continue.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "The requested item or page could not be found.";
      case 409:
        return "This item was recently modified or already exists. Please refresh and try again.";
      case 422:
        return "Some fields were incomplete or invalid. Please check the highlighted inputs.";
      case 429:
        return "Too many requests. Please wait a moment before trying again.";
      case 500:
      case 502:
      case 503:
      case 504:
        return "Our servers encountered a temporary issue. Please try again in a few moments.";
      default:
        return fallback;
    }
  }

  // 5. Standard JavaScript Error object
  if (error instanceof Error && error.message && !isTechnicalString(error.message)) {
    return error.message.replace(/^error:\s*/i, "");
  }

  return fallback;
}
