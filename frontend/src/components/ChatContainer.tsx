import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { websocketConnected } from '../store/slices/messageSlice';
import { useGetMessagesQuery } from '../store/api/messageApi';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Header from './Header';

const ChatContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, connectionStatus } = useSelector((state: RootState) => state.messages);
  
  const { 
    data: messages = [], 
    isLoading, 
    error, 
    refetch 
  } = useGetMessagesQuery(undefined, {
    pollingInterval: 0, 
    refetchOnMountOrArgChange: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(websocketConnected());
    
    return () => {
    };
  }, [dispatch]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle connection status changes
  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      console.log('Connection lost, attempting to reconnect...');
    }
  }, [connectionStatus]);

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center">
      <div className="w-4/5 max-w-6xl h-screen flex flex-col bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/40 mt-8 mb-8">
        <Header 
          currentUser={currentUser} 
          connectionStatus={connectionStatus}
          messageCount={messages.length}
        />
        
        <div className="flex-1 flex flex-col min-h-0">
          <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading messages...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="text-red-500 text-center">
                  <p className="text-lg font-semibold">Failed to load messages</p>
                  <p className="text-sm mt-1">Please check your connection and try again</p>
                </div>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-semibold">No messages yet</p>
                  <p className="text-sm mt-1">Start the conversation!</p>
                </div>
              </div>
            ) : (
              <MessageList messages={messages} currentUser={currentUser} />
            )}
          </div>
          
          <MessageInput currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer; 