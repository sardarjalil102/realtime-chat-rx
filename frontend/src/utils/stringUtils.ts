/**
 * String utility functions for the message app
 */

/**
 * Get user initials from a name
 * @param name - Full name of the user
 * @returns Initials (e.g., "JD" for "John Doe")
 */
export const getInitials = (name: string): string => {
  if (!name || typeof name !== 'string') return '?';
  
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2); // Limit to 2 characters
};

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add when truncated (default: "...")
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export const capitalizeWords = (text: string): string => {
  if (!text) return '';
  
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Generate a random user ID
 * @param prefix - Prefix for the user ID (default: "User")
 * @returns Random user ID
 */
export const generateUserId = (prefix: string = 'User'): string => {
  const randomNum = Math.floor(Math.random() * 10000);
  return `${prefix}${randomNum}`;
};

/**
 * Sanitize text input (remove extra whitespace, etc.)
 * @param text - Text to sanitize
 * @returns Sanitized text
 */
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  return text
    .trim()
    .replace(/\s+/g, ' '); // Replace multiple spaces with single space
};

/**
 * Check if text contains only whitespace
 * @param text - Text to check
 * @returns True if text is empty or only whitespace
 */
export const isEmptyOrWhitespace = (text: string): boolean => {
  return !text || text.trim().length === 0;
};

/**
 * Escape HTML special characters
 * @param text - Text to escape
 * @returns Escaped text
 */
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Generate a unique ID
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 */
export const generateUniqueId = (prefix: string = 'id'): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${random}`;
}; 