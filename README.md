# Message App

A real-time messaging application that lets you chat with others instantly! Built with modern web technologies for a smooth, responsive experience.

## What You Can Do

-  **Real-time messaging** - See messages instantly as they're sent
-  **Auto-scroll** - Automatically jumps to new messages
- **Responsive design** - Works great on desktop and mobile
-  **Connection status** - Always know if you're connected
-  **Modern UI** - Clean, beautiful interface with Tailwind CSS

## Built With

### Frontend
- **React 18** - Modern UI framework
- **Redux Toolkit** - State management
- **Redux Saga** - Handles complex async operations
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Beautiful, responsive styling
- **Vite** - Fast development and building

### Backend
- **Node.js** - Server runtime
- **Express** - Web framework
- **WebSocket** - Real-time communication
- **TypeScript** - Type safety on the server too!

### What You Need
- **Node.js** (version 16 or newer)
- **npm** or **yarn** package manager

### Step 1: Get the Code
```bash
git clone <repository-url>
cd message-app
```

### Step 2: Install Everything
```bash
npm run install:all
```

### Step 3: Start the App
```bash
npm run dev
```

 **That's it!**  app is now running at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **WebSocket**: ws://localhost:3001

Open  browser and go to http://localhost:3000 to start chatting!

##  How to Use

1. **You'll get a random user ID** - no signup needed!
2. **Type your message** in the input box
3. **Press Enter** or click the Send button
4. **Watch messages appear** in real-time
5. **See connection status** in the header

## For Developers

### Building for Production
```bash
npm run build
```

### API Endpoints
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send a new message
- `ws://localhost:3001` - Real-time WebSocket connection

### Key Technical Features

**Redux Saga** - Handles all the complex stuff:
- API calls and WebSocket connections
- Automatic reconnection when connection drops
- Clean error handling

**Auto-scroll** - Smart scrolling:
- Automatically shows new messages
- Smooth animations for better experience
- Works on all screen sizes

**WebSocket Magic** - Real-time communication:
- Instant message delivery
- Handles connection drops gracefully
- Shows connection status to users

**TypeScript** - Developer-friendly:
- Catches errors before they happen
- Better code completion in your editor
- Shared types between frontend and backend

## Development Notes

- Messages are stored in memory (they'll disappear when you restart the server)
- WebSocket connections are managed through Redux Saga
- All connected users see messages in real-time
- The frontend automatically proxies API calls to the backend

 