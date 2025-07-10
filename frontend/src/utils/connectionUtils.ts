// WebSocket connection utils — basic helpers and config

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

export interface ConnectionConfig {
  url: string;
  maxReconnectAttempts: number;
  reconnectDelay: number;
  timeout: number;
}

export const DEFAULT_CONNECTION_CONFIG: ConnectionConfig = {
  url: 'ws://localhost:3001',
  maxReconnectAttempts: 5,
  reconnectDelay: 3000,
  timeout: 5000
};

// UI helpers based on status
export const getConnectionStatusColor = (status: ConnectionStatus): string => {
  switch (status) {
    case 'connected':
      return 'text-green-500';
    case 'connecting':
      return 'text-yellow-500';
    case 'disconnected':
    case 'error':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const getConnectionStatusText = (status: ConnectionStatus): string => {
  switch (status) {
    case 'connected':
      return 'Connected';
    case 'connecting':
      return 'Connecting...';
    case 'disconnected':
      return 'Disconnected';
    case 'error':
      return 'Error';
    default:
      return 'Unknown';
  }
};

// Exponential backoff (with jitter)
export const calculateBackoffDelay = (
  attempt: number,
  baseDelay = 1000,
  maxDelay = 30000
): number => {
  const delay = Math.min(baseDelay * 2 ** attempt, maxDelay);
  return delay + Math.random() * 1000; // add jitter
};

// Check if ws is open
export const isWebSocketReady = (ws: WebSocket | null): boolean =>
  ws !== null && ws.readyState === WebSocket.OPEN;

// Just for debugging or UI labels
export const getWebSocketStateText = (readyState: number): string => {
  switch (readyState) {
    case WebSocket.CONNECTING:
      return 'Connecting';
    case WebSocket.OPEN:
      return 'Open';
    case WebSocket.CLOSING:
      return 'Closing';
    case WebSocket.CLOSED:
      return 'Closed';
    default:
      return 'Unknown';
  }
};

// Create WebSocket with timeout logic
export const createWebSocketConnection = (
  url: string,
  timeout = 5000
): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const timer = setTimeout(() => reject(new Error('Timeout')), timeout);

    ws.onopen = () => {
      clearTimeout(timer);
      resolve(ws);
    };

    ws.onerror = (err) => {
      clearTimeout(timer);
      reject(err);
    };

    ws.onclose = () => {
      clearTimeout(timer);
      reject(new Error('Connection closed'));
    };
  });
};

// Naive message validator — assumes stringified JSON w/ a "type" field
export const isValidWebSocketMessage = (data: any): boolean => {
  if (typeof data !== 'string') return false;
  try {
    const parsed = JSON.parse(data);
    return parsed && typeof parsed === 'object' && 'type' in parsed;
  } catch {
    return false;
  }
};

// Wraps status info for UI state tracking
export const createConnectionStatus = (
  status: ConnectionStatus,
  error?: string
) => ({
  status,
  error,
  timestamp: new Date(),
  color: getConnectionStatusColor(status),
  text: getConnectionStatusText(status)
});
