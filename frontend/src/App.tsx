import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ChatContainer from './components/ChatContainer';
import './index.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <ChatContainer />
      </div>
    </Provider>
  );
};

export default App; 