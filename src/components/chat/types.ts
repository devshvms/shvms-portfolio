export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
  messageCount: number;
}

export interface ChatState {
  currentSession: ChatSession | null;
  isInitialized: boolean;
  maxMessages: number;
}
