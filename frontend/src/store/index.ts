import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import messageReducer from './slices/messageSlice';
import { messageApi } from './api/messageApi';
import { websocketMiddleware } from './middleware/websocketMiddleware';

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'messages/websocketMessageReceived',
          'messages/websocketConnected',
          'messages/websocketDisconnected'
        ],
        ignoredActionPaths: ['payload.timestamp'],
        ignoredPaths: ['messages.messages'],
      },
    })
    .concat(messageApi.middleware)
    .concat(websocketMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 