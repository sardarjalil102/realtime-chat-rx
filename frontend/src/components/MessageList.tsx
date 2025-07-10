import React from 'react';
import MessageItem from './MessageItem';
import { Message } from '../types/message';

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">No messages yet</p>
          <p className="text-sm mt-1">Start the conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isCurrentUser={message.sender === currentUser}
        />
      ))}
    </div>
  );
};

export default MessageList; 