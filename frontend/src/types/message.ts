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