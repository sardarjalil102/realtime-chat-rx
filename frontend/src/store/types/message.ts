export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

export interface WebSocketMessage {
  type: 'NEW_MESSAGE' | 'CONNECT' | 'DISCONNECT';
  payload?: Message;
  userId?: string;
}

export interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  currentUser: string;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  lastMessageId: string | null;
}

export interface SendMessagePayload {
  text: string;
  sender: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Action Types
export const MESSAGE_ACTIONS = {
  FETCH_MESSAGES_REQUEST: 'messages/fetchMessagesRequest',
  FETCH_MESSAGES_SUCCESS: 'messages/fetchMessagesSuccess',
  FETCH_MESSAGES_FAILURE: 'messages/fetchMessagesFailure',
  
  SEND_MESSAGE_REQUEST: 'messages/sendMessageRequest',
  SEND_MESSAGE_SUCCESS: 'messages/sendMessageSuccess',
  SEND_MESSAGE_FAILURE: 'messages/sendMessageFailure',
  
  ADD_MESSAGE: 'messages/addMessage',
  SET_MESSAGES: 'messages/setMessages',
  SET_CURRENT_USER: 'messages/setCurrentUser',
  SET_CONNECTION_STATUS: 'messages/setConnectionStatus',
  SET_ERROR: 'messages/setError',
  CLEAR_ERROR: 'messages/clearError',
  SET_LOADING: 'messages/setLoading',
  
  WEBSOCKET_CONNECTED: 'messages/websocketConnected',
  WEBSOCKET_DISCONNECTED: 'messages/websocketDisconnected',
  WEBSOCKET_MESSAGE_RECEIVED: 'messages/websocketMessageReceived'
} as const; 