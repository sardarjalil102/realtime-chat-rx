
export const getInitials = (name: string): string => {
  if (!name || typeof name !== 'string') return '?';
  
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2); 
};


export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

export const capitalizeWords = (text: string): string => {
  if (!text) return '';
  
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const generateUserId = (prefix: string = 'User'): string => {
  const randomNum = Math.floor(Math.random() * 10000);
  return `${prefix}${randomNum}`;
};


export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  return text
    .trim()
    .replace(/\s+/g, ' '); // Replace multiple spaces with single space
};


export const isEmptyOrWhitespace = (text: string): boolean => {
  return !text || text.trim().length === 0;
};


export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};


export const generateUniqueId = (prefix: string = 'id'): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${random}`;
}; 