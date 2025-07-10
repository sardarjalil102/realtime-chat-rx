/**
 * Date utility functions for the message app
 */

/**
 * Format a date for display in chat messages
 * @param date - Date to format
 * @returns Formatted time string (e.g., "14:30")
 */
export const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Format a date for display in message list
 * @param date - Date to format
 * @returns Formatted date string (e.g., "Today 14:30" or "Dec 15, 14:30")
 */
export const formatMessageDate = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (messageDate.getTime() === today.getTime()) {
    return `Today ${formatMessageTime(date)}`;
  } else {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric' 
    }) + `, ${formatMessageTime(date)}`;
  }
};

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns True if the date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

/**
 * Get relative time string (e.g., "2 minutes ago", "1 hour ago")
 * @param date - Date to get relative time for
 * @returns Relative time string
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}; 