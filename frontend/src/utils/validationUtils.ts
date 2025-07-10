
export const validateMessageText = (text: string, maxLength: number = 1000) => {
  if (!text || text.trim().length === 0) {
    return {
      isValid: false,
      error: 'Message cannot be empty'
    };
  }
  
  if (text.length > maxLength) {
    return {
      isValid: false,
      error: `Message is too long. Maximum ${maxLength} characters allowed.`
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};


export const validateUsername = (username: string, minLength: number = 2, maxLength: number = 20) => {
  if (!username || username.trim().length === 0) {
    return {
      isValid: false,
      error: 'Username cannot be empty'
    };
  }
  
  if (username.length < minLength) {
    return {
      isValid: false,
      error: `Username must be at least ${minLength} characters long`
    };
  }
  
  if (username.length > maxLength) {
    return {
      isValid: false,
      error: `Username must be no more than ${maxLength} characters long`
    };
  }
  
  // Check for valid characters (letters, numbers, spaces, hyphens, underscores)
  const validUsernameRegex = /^[a-zA-Z0-9\s\-_]+$/;
  if (!validUsernameRegex.test(username)) {
    return {
      isValid: false,
      error: 'Username can only contain letters, numbers, spaces, hyphens, and underscores'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};


export const validateEmail = (email: string) => {
  if (!email || email.trim().length === 0) {
    return {
      isValid: false,
      error: 'Email cannot be empty'
    };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};


export const validateWebSocketUrl = (url: string) => {
  if (!url || url.trim().length === 0) {
    return {
      isValid: false,
      error: 'WebSocket URL cannot be empty'
    };
  }
  
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'ws:' && urlObj.protocol !== 'wss:') {
      return {
        isValid: false,
        error: 'WebSocket URL must use ws:// or wss:// protocol'
      };
    }
  } catch {
    return {
      isValid: false,
      error: 'Invalid WebSocket URL format'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};


export const validateMessageObject = (message: any) => {
  if (!message || typeof message !== 'object') {
    return {
      isValid: false,
      error: 'Message must be an object'
    };
  }
  
  const requiredFields = ['id', 'text', 'sender', 'timestamp'];
  for (const field of requiredFields) {
    if (!(field in message)) {
      return {
        isValid: false,
        error: `Message is missing required field: ${field}`
      };
    }
  }
  
  if (typeof message.text !== 'string' || message.text.trim().length === 0) {
    return {
      isValid: false,
      error: 'Message text must be a non-empty string'
    };
  }
  
  if (typeof message.sender !== 'string' || message.sender.trim().length === 0) {
    return {
      isValid: false,
      error: 'Message sender must be a non-empty string'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};


export const sanitizeAndValidateInput = (input: string, type: 'message' | 'username' | 'email') => {
  const sanitized = input.trim();
  
  switch (type) {
    case 'message':
      return validateMessageText(sanitized);
    case 'username':
      return validateUsername(sanitized);
    case 'email':
      return validateEmail(sanitized);
    default:
      return {
        isValid: false,
        error: 'Unknown input type'
      };
  }
}; 