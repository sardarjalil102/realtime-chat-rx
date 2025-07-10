import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { 
  websocketConnected, 
  websocketDisconnected, 
  websocketMessageReceived 
} from '../slices/messageSlice';
import { Message, WebSocketMessage } from '../types/message';

// WebSocket connection management
let ws: WebSocket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;

// Create listener middleware
export const websocketListener = createListenerMiddleware();

// WebSocket connection function
const connectWebSocket = () => {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('WebSocket connection timeout'));
    }, 3000);
    
    ws = new WebSocket('ws://localhost:3001');
    
    ws.onopen = () => {
      clearTimeout(timeout);
      console.log('WebSocket connected');
      resolve();
    };
    
    ws.onerror = (error) => {
      clearTimeout(timeout);
      console.error('WebSocket error:', error);
      reject(error);
    };
    
    ws.onclose = () => {
      clearTimeout(timeout);
      reject(new Error('WebSocket connection closed'));
    };
  });
};

// Handle reconnection
const handleReconnection = async (dispatch: any) => {
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    reconnectAttempts++;
    dispatch(websocketDisconnected());
    
    await new Promise(resolve => setTimeout(resolve, RECONNECT_DELAY));
    
    try {
      await connectWebSocket();
      dispatch(websocketConnected());
      reconnectAttempts = 0;
    } catch (error) {
      console.error('Reconnection failed:', error);
      handleReconnection(dispatch);
    }
  } else {
    dispatch(websocketDisconnected());
  }
};

// Start WebSocket connection
websocketListener.startListening({
  actionCreator: websocketConnected,
  effect: async (action, listenerApi) => {
    try {
      await connectWebSocket();
      
      // Set up message listener
      if (ws) {
        ws.onmessage = (event) => {
          try {
            const data: WebSocketMessage = JSON.parse(event.data);
            console.log(data)
            if (data.type === 'NEW_MESSAGE' && data.payload) {
              const message: Message = {
                ...data.payload,
                timestamp: new Date(data.payload.timestamp)
              };
              listenerApi.dispatch(websocketMessageReceived(message));
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
        
        ws.onclose = () => {
          listenerApi.dispatch(websocketDisconnected());
          handleReconnection(listenerApi.dispatch);
        };
        
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          listenerApi.dispatch(websocketDisconnected());
        };
      }
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      listenerApi.dispatch(websocketDisconnected());
      handleReconnection(listenerApi.dispatch);
    }
  }
});

// Handle disconnection
websocketListener.startListening({
  actionCreator: websocketDisconnected,
  effect: async (action, listenerApi) => {
    if (ws) {
      ws.close();
      ws = null;
    }
  }
});

export const { middleware: websocketMiddleware } = websocketListener; 