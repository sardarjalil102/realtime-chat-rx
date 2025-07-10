import React from 'react';
import { Message } from '../types/message';
import { formatMessageTime, getInitials } from '../utils';

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
      {!isCurrentUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-base border-2 border-white shadow">
          {getInitials(message.sender)}
        </div>
      )}
      <div
        className={`max-w-md lg:max-w-2xl px-4 py-2 rounded-2xl shadow-md mb-1 transition-all duration-200 ${
          isCurrentUser
            ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-br-none'
            : 'bg-white/90 text-gray-800 rounded-bl-none border border-gray-200'
        }`}
      >
        <div className="text-xs font-semibold mb-1 opacity-80">
          {message.sender}
        </div>
        <div className="text-base break-words">
          {message.text}
        </div>
        <div className={`text-xs mt-1 text-right opacity-60 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {formatMessageTime(message.timestamp)}
        </div>
      </div>
      {/* show avatar for current user */}
      {isCurrentUser && (
        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center font-bold text-white text-base border-2 border-white shadow">
          {getInitials(message.sender)}
        </div>
      )}
    </div>
  );
};

export default MessageItem; 