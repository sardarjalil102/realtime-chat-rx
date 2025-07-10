import React, { useState } from 'react';
import { useSendMessageMutation } from '../store/api/messageApi';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { validateMessageText, sanitizeText, isEmptyOrWhitespace } from '../utils';

interface MessageInputProps {
  currentUser: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ currentUser }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate and sanitize input
    const sanitizedMessage = sanitizeText(message);
    const validation = validateMessageText(sanitizedMessage);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    if (isEmptyOrWhitespace(sanitizedMessage) || isLoading) return;

    try {
      await sendMessage({
        text: sanitizedMessage,
        sender: currentUser
      }).unwrap();
      
      setMessage('');
      setError(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
            {error}
          </div>
        )}
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            loading={isLoading}
            className="px-6"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput; 