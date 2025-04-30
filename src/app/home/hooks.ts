import { useState, useRef, useEffect } from 'react';
import { WebSocketClient } from '@/client';
import { SummarizationStyle } from '@/constants';

type Message = {
  text: string;
  isUser: boolean;
};

type WebSocketData = string | { 
  message?: string; 
  text?: string; 
  content?: string; 
  [key: string]: unknown;
};

export const useSummarizeWebsocket = () => {
  const [text, setText] = useState('');
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [summarizationStyle, setSummarizationStyle] = useState<SummarizationStyle>(SummarizationStyle.NORMAL);
  const wsRef = useRef<WebSocketClient | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartConnection = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    wsRef.current = new WebSocketClient('/api/ws/summarize_stream');
    
    wsRef.current.on('open', () => {
      setConnected(true);
      setMessages(prev => [...prev, { 
        text: "Connected! Youkie is ready to help you summarize your content.",
        isUser: false 
      }]);
    });

    wsRef.current.on('message', (data) => {
      console.log('Received message:', data);
      
      const formatText = (data: WebSocketData): string => {
        if (typeof data === 'string') {
          return data;
        } else if (data && typeof data === 'object') {
          return data.message || data.text || data.content || JSON.stringify(data);
        } else {
          return "Received unknown response format";
        }
      };
      
      const messageText = formatText(data);
      setMessages(prev => [...prev, { 
        text: messageText,
        isUser: false 
      }]);
    });

    wsRef.current.on('error', (error) => {
      console.error('WebSocket error:', error);
      setMessages(prev => [...prev, { 
        text: "Connection error. Please try again later.",
        isUser: false 
      }]);
    });

    wsRef.current.on('close', () => {
      setConnected(false);
      setMessages(prev => [...prev, { 
        text: "Disconnected from Youkie.",
        isUser: false 
      }]);
    });

    wsRef.current.connect();
  };

  const handleSendMessage = () => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text, isUser: true }]);
    
    if (wsRef.current && wsRef.current.isConnected()) {
      try {
        wsRef.current.send({ 
          text: text,
          style: summarizationStyle
        });
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => [...prev, { 
          text: "Error sending message. Please try again.",
          isUser: false 
        }]);
      }
    } else {
      setMessages(prev => [...prev, { 
        text: "Not connected to the server. Please try connecting first.",
        isUser: false 
      }]);
    }
    
    setText('');
  };

  const handleStyleChange = (style: SummarizationStyle) => {
    setSummarizationStyle(style);
  };

  return {
    text,
    setText,
    connected,
    messages,
    messagesEndRef,
    summarizationStyle,
    handleStartConnection,
    handleSendMessage,
    handleStyleChange
  };
};

