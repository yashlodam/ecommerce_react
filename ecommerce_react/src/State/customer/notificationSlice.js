import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

const API_URL = "/api/notifications";

// Fetch notifications with pagination and filtering
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async ({ page = 0, size = 20, unreadOnly = false, role = null } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("size", size);
      if (unreadOnly) {
        params.append("unreadOnly", "true");
      }
      if (role) {
        params.append("role", role);
      }
      const response = await api.get(`${API_URL}?${params.toString()}`);
      return { data: response.data, page, unreadOnly };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notifications"
      );
    }
  }
);

// Fetch unread count for badge
export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async ({ role = null } = {}, { rejectWithValue }) => {
    try {
      const params = role ? `?role=${role}` : "";
      const response = await api.get(`${API_URL}/unread-count${params}`);
      return response.data?.count ?? 0;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch unread count"
      );
    }
  }
);

// Mark single notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/${notificationId}/read`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark notification as read"
      );
    }
  }
);

// Mark all notifications as read
export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllNotificationsAsRead",
  async ({ role = null } = {}, { rejectWithValue }) => {
    try {
      const params = role ? `?role=${role}` : "";
      const response = await api.patch(`${API_URL}/read-all${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark all notifications as read"
      );
    }
  }
);

// Delete single notification
export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (notificationId, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${notificationId}`);
      return notificationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete notification"
      );
    }
  }
);

// Delete all read notifications
export const deleteAllReadNotifications = createAsyncThunk(
  "notifications/deleteAllReadNotifications",
  async ({ role = null } = {}, { rejectWithValue }) => {
    try {
      const params = role ? `?role=${role}` : "";
      const response = await api.delete(`${API_URL}/read${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete read notifications"
      );
    }
  }
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  page: 0,
  totalPages: 0,
  totalElements: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
    resetNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
      state.page = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.loading = false;
      state.error = null;
    },
    decrementUnreadCount: (state) => {
      state.unreadCount = Math.max(0, state.unreadCount - 1);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchNotifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        const pageData = action.payload.data;
        const content = pageData?.content || [];
        state.notifications = content;
        state.page = pageData?.number ?? 0;
        state.totalPages = pageData?.totalPages ?? 0;
        state.totalElements = pageData?.totalElements ?? 0;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchUnreadCount
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })

      // markNotificationAsRead
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated || !updated.id) return;
        const idx = state.notifications.findIndex((n) => n.id === updated.id);
        if (idx !== -1) {
          if (!state.notifications[idx].read) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
          state.notifications[idx] = updated;
        }
      })

      // markAllNotificationsAsRead
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.unreadCount = 0;
        state.notifications = state.notifications.map((n) => ({
          ...n,
          read: true,
          readAt: new Date().toISOString(),
        }));
      })

      // deleteNotification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const id = action.payload;
        const target = state.notifications.find((n) => n.id === id);
        if (target && !target.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications = state.notifications.filter((n) => n.id !== id);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })

      // deleteAllReadNotifications
      .addCase(deleteAllReadNotifications.fulfilled, (state) => {
        state.notifications = state.notifications.filter((n) => !n.read);
      });
  },
});

export const { clearNotificationError, resetNotifications, decrementUnreadCount } =
  notificationSlice.actions;

export default notificationSlice.reducer;
