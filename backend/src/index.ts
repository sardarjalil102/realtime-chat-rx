import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Message, WebSocketMessage } from './types/message';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const messages: Message[] = [];
const clients = new Set<WebSocket>();

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { text, sender } = req.body;
  
  if (!text || !sender) {
    return res.status(400).json({ error: 'Text and sender are required' });
  }

  const newMessage: Message = {
    id: uuidv4(),
    text,
    sender,
    timestamp: new Date()
  };

  messages.push(newMessage);

  const wsMessage: WebSocketMessage = {
    type: 'NEW_MESSAGE',
    payload: newMessage
  };

  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(wsMessage));
    }
  });

  res.status(201).json(newMessage);
});

wss.on('connection', (ws: WebSocket) => {
  console.log('New WebSocket connection');
  clients.add(ws);

  const existingMessages: WebSocketMessage = {
    type: 'NEW_MESSAGE',
    payload: messages[messages.length - 1]
  };
  
  if (messages.length > 0) {
    ws.send(JSON.stringify(existingMessages));
  }

  ws.on('message', (data: string) => {
    try {
      const message: WebSocketMessage = JSON.parse(data);
      console.log('Received WebSocket message:', message);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready`);
}); 