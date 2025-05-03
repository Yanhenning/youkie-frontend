import { EventEmitter } from 'events';
import { getLocalStorage } from '@/utils';

const getWebSocketUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    const baseUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.youkie.com';
    return baseUrl;
  }
  return 'ws://localhost:8000';
};

class WebSocketClient extends EventEmitter {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectTimeout = 1000;

  constructor(path: string) {
    super();
    this.url = `${getWebSocketUrl()}${path}`;
  }

  connect(): void {
    if (this.socket) {
      this.socket.close();
    }

    // Get authentication token from localStorage
    const token = getLocalStorage('token');
    
    // Append token to URL if it exists
    const connectionUrl = token 
      ? `${this.url}?token=${token}`
      : this.url;

    this.socket = new WebSocket(connectionUrl);

    this.socket.onopen = () => {
      this.emit('open');
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Check for authentication errors
        if (data.error === 'authentication_failed' || data.status === 401) {
          this.emit('auth_error', data);
          return;
        }
        
        this.emit('message', data);
      } catch {
        this.emit('message', event.data);
      }
    };

    this.socket.onerror = (error) => {
      this.emit('error', error);
    };

    this.socket.onclose = (event) => {
      // Check if close was due to authentication issues
      if (event.code === 1008 || event.code === 4001) {
        this.emit('auth_error', { message: 'Authentication failed' });
      }
      
      this.emit('close', event);
      
      // Attempt to reconnect
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(), this.reconnectTimeout);
      }
    };
  }

  send(data: unknown): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.emit('error', new Error('WebSocket is not connected'));
      return;
    }

    const message = typeof data === 'string' ? data : JSON.stringify(data);
    this.socket.send(message);
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }
}

export default WebSocketClient;
