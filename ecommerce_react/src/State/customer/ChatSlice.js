import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../config/api';

const SESSION_KEY = 'shopsphere_chat_session_id';

export const sendChatMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, sessionId }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/chat', {
        message,
        sessionId: sessionId || undefined,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to communicate with shopping assistant'
      );
    }
  }
);

export const fetchChatHistory = createAsyncThunk(
  'chat/fetchHistory',
  async (sessionId, { rejectWithValue }) => {
    if (!sessionId) return [];
    try {
      const response = await api.get('/api/chat/history/' + sessionId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load conversation history'
      );
    }
  }
);

export const clearChatSession = createAsyncThunk(
  'chat/clearSession',
  async (sessionId, { rejectWithValue }) => {
    if (!sessionId) return null;
    try {
      await api.delete('/api/chat/session/' + sessionId);
      return sessionId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to clear session'
      );
    }
  }
);

const initialSessionId = localStorage.getItem(SESSION_KEY) || null;

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    sessionId: initialSessionId,
    messages: [],
    loading: false,
    isOpen: false,
    error: null,
  },
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    openChat: (state) => {
      state.isOpen = true;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
    resetChat: (state) => {
      state.sessionId = null;
      state.messages = [];
      state.error = null;
      localStorage.removeItem(SESSION_KEY);
    },
    addOptimisticUserMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        role: 'USER',
        content: action.payload,
        createdAt: new Date().toISOString(),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── sendChatMessage ───
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        const resp = action.payload;
        if (resp?.sessionId) {
          state.sessionId = resp.sessionId;
          localStorage.setItem(SESSION_KEY, resp.sessionId);
        }
        state.messages.push({
          id: Date.now() + 1,
          role: 'ASSISTANT',
          content: resp.message,
          intent: resp.intent,
          executionMode: resp.executionMode,
          products: resp.products || [],
          actions: resp.actions || [],
          cartSummary: resp.cartSummary,
          orderSummary: resp.orderSummary,
          createdAt: new Date().toISOString(),
        });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.push({
          id: Date.now() + 2,
          role: 'ASSISTANT',
          content: 'Sorry, I encountered an issue processing your request. Please try again.',
          intent: 'ERROR',
          products: [],
          actions: [],
          createdAt: new Date().toISOString(),
        });
      })

      // ─── fetchChatHistory ───
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.messages = action.payload.map((msg) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            intent: msg.intent,
            createdAt: msg.createdAt,
          }));
        }
      })

      // ─── clearChatSession ───
      .addCase(clearChatSession.fulfilled, (state) => {
        state.sessionId = null;
        state.messages = [];
        localStorage.removeItem(SESSION_KEY);
      });
  },
});

export const { toggleChat, openChat, closeChat, resetChat, addOptimisticUserMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
