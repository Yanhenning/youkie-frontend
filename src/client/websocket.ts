import { EventEmitter } from 'events';

// Get WebSocket URL based on environment
const getWebSocketUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    const baseUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.youkie.com'; // TBD for production
    return baseUrl;
  }
  return 'ws://localhost:8000'; // Local environment
};

class WebSocketClient extends EventEmitter {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;

  constructor(path: string) {
    super();
    this.url = `${getWebSocketUrl()}${path}`;
  }

  connect(): void {
    if (this.socket) {
      this.socket.close();
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.emit('open');
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit('message', data);
      } catch {
        this.emit('message', event.data);
      }
    };

    this.socket.onerror = (error) => {
      this.emit('error', error);
    };

    this.socket.onclose = (event) => {
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
