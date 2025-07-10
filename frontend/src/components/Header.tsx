import React from 'react';
import { getInitials, getConnectionStatusColor, getConnectionStatusText } from '../utils';

interface HeaderProps {
  currentUser: string;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  messageCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentUser, connectionStatus, messageCount }) => {
  const connectionInfo = {
    statusText: getConnectionStatusText(connectionStatus),
    statusColor: getConnectionStatusColor(connectionStatus)
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg px-8 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white bg-opacity-80 rounded-full p-2 shadow-md">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="#6366F1"/>
              <path d="M7 10h10M7 14h6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow">Message App</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full shadow">
            <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-lg border-2 border-white">
              {getInitials(currentUser)}
            </div>
            <span className="text-white font-medium text-base drop-shadow">{currentUser}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className={`relative flex h-3 w-3 mr-1`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${connectionInfo.statusColor === 'text-red-500' ? 'bg-red-400' : connectionInfo.statusColor === 'text-yellow-500' ? 'bg-yellow-400' : 'bg-green-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${connectionInfo.statusColor === 'text-red-500' ? 'bg-red-500' : connectionInfo.statusColor === 'text-yellow-500' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
            </span>
            <span className="text-white text-xs font-semibold drop-shadow">
              {connectionInfo.statusText}
            </span>
          </div>
          <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full shadow">
            <span className="text-white text-xs font-semibold drop-shadow">
              {messageCount} messages
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 