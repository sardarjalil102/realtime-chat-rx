/**
 * Main utilities index file
 * Export all utility functions for easy importing
 */

// Date utilities
export * from './dateUtils';

// String utilities
export * from './stringUtils';

// Validation utilities
export * from './validationUtils';

// Connection utilities
export * from './connectionUtils';

// Re-export commonly used functions for convenience
export {
  formatMessageTime,
  formatMessageDate,
  getRelativeTime
} from './dateUtils';

export {
  getInitials,
  generateUserId,
  sanitizeText,
  isEmptyOrWhitespace
} from './stringUtils';

export {
  validateMessageText,
  validateUsername,
  sanitizeAndValidateInput
} from './validationUtils';

export {
  getConnectionStatusColor,
  getConnectionStatusText,
  isWebSocketReady,
  createWebSocketConnection
} from './connectionUtils'; 