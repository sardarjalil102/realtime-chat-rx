import { createSlice, PayloadAction, createListenerMiddleware } from '@reduxjs/toolkit';
import { 
  MessageState, 
  Message, 
  SendMessagePayload
} from '../types/message';
import { generateUserId } from '../../utils';

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
  currentUser: generateUserId(),
  connectionStatus: 'disconnected',
  lastMessageId: null
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<MessageState['connectionStatus']>) => {
      state.connectionStatus = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      // Check if message already exists to prevent duplicates
      const exists = state.messages.some(msg => msg.id === action.payload.id);
      if (!exists) {
        state.messages.push(action.payload);
        state.lastMessageId = action.payload.id;
        state.error = null;
      }
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
      if (action.payload.length > 0) {
        state.lastMessageId = action.payload[action.payload.length - 1].id;
      }
    },
    clearMessages: (state) => {
      state.messages = [];
      state.lastMessageId = null;
    },
    updateMessage: (state, action: PayloadAction<{ id: string; updates: Partial<Message> }>) => {
      const { id, updates } = action.payload;
      const messageIndex = state.messages.findIndex(msg => msg.id === id);
      if (messageIndex !== -1) {
        state.messages[messageIndex] = { ...state.messages[messageIndex], ...updates };
      }
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(msg => msg.id !== action.payload);
    },
    
    websocketConnected: (state) => {
      state.connectionStatus = 'connected';
      state.error = null;
    },
    websocketDisconnected: (state) => {
      state.connectionStatus = 'disconnected';
      state.error = 'WebSocket connection lost';
    },
    websocketMessageReceived: (state, action: PayloadAction<Message>) => {
      const exists = state.messages.some(msg => msg.id === action.payload.id);
      if (!exists) {
        state.messages.push(action.payload);
        state.lastMessageId = action.payload.id;
        state.error = null;
      }
    }
  }
});

export const {
  setCurrentUser,
  setConnectionStatus,
  setError,
  clearError,
  setLoading,
  addMessage,
  setMessages,
  clearMessages,
  updateMessage,
  removeMessage,
  websocketConnected,
  websocketDisconnected,
  websocketMessageReceived
} = messageSlice.actions;

export default messageSlice.reducer; 