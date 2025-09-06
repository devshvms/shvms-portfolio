import { ChatMessage, ChatSession, ChatState } from '../components/chat/types';

export class ChatSessionService {
  private static instance: ChatSessionService;
  private readonly STORAGE_KEY = 'portfolio_chat_session';
  private readonly MAX_MESSAGES = 30;
  private readonly SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

  static getInstance(): ChatSessionService {
    if (!ChatSessionService.instance) {
      ChatSessionService.instance = new ChatSessionService();
    }
    return ChatSessionService.instance;
  }

  // Load chat session from localStorage
  loadSession(): ChatState {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const sessionData = JSON.parse(stored);
        
        // Check if session is still valid (not expired)
        const lastActivity = new Date(sessionData.lastActivity);
        const now = new Date();
        
        if (now.getTime() - lastActivity.getTime() < this.SESSION_TIMEOUT) {
          return {
            currentSession: {
              ...sessionData,
              createdAt: new Date(sessionData.createdAt),
              lastActivity: new Date(sessionData.lastActivity),
              messages: sessionData.messages.map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
              }))
            },
            isInitialized: true,
            maxMessages: this.MAX_MESSAGES
          };
        } else {
          // Session expired, clear it
          this.clearSession();
        }
      }
    } catch (error) {
      console.error('Error loading chat session:', error);
      this.clearSession();
    }

    // Return default state
    return {
      currentSession: null,
      isInitialized: false,
      maxMessages: this.MAX_MESSAGES
    };
  }

  // Save chat session to localStorage
  saveSession(session: ChatSession): void {
    try {
      const sessionData = {
        ...session,
        lastActivity: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error saving chat session:', error);
    }
  }

  // Create a new chat session
  createSession(): ChatSession {
    const session: ChatSession = {
      id: `session_${Date.now()}`,
      messages: [],
      createdAt: new Date(),
      lastActivity: new Date(),
      messageCount: 0
    };
    
    this.saveSession(session);
    return session;
  }

  // Add message to session
  addMessage(session: ChatSession, message: ChatMessage): ChatSession {
    const updatedSession = {
      ...session,
      messages: [...session.messages, message],
      messageCount: session.messageCount + 1,
      lastActivity: new Date()
    };

    // Enforce message limit
    if (updatedSession.messages.length > this.MAX_MESSAGES) {
      // Remove oldest messages, keeping the initial greeting
      const initialMessages = updatedSession.messages.slice(0, 1); // Keep first message (greeting)
      const recentMessages = updatedSession.messages.slice(-(this.MAX_MESSAGES - 1));
      updatedSession.messages = [...initialMessages, ...recentMessages];
    }

    this.saveSession(updatedSession);
    return updatedSession;
  }

  // Check if session can accept more messages
  canAddMessage(session: ChatSession): boolean {
    return session.messageCount < this.MAX_MESSAGES;
  }

  // Get remaining message count
  getRemainingMessages(session: ChatSession): number {
    return Math.max(0, this.MAX_MESSAGES - session.messageCount);
  }

  // Clear session
  clearSession(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing chat session:', error);
    }
  }

  // Get session statistics
  getSessionStats(session: ChatSession): {
    messageCount: number;
    remainingMessages: number;
    sessionAge: number;
    isNearLimit: boolean;
  } {
    const now = new Date();
    const sessionAge = now.getTime() - session.createdAt.getTime();
    const remainingMessages = this.getRemainingMessages(session);
    
    return {
      messageCount: session.messageCount,
      remainingMessages,
      sessionAge: Math.floor(sessionAge / (1000 * 60)), // in minutes
      isNearLimit: remainingMessages <= 5
    };
  }

  // Check if session exists and is valid
  hasValidSession(): boolean {
    const state = this.loadSession();
    return state.currentSession !== null && state.isInitialized;
  }
}

// Export singleton instance
export const chatSessionService = ChatSessionService.getInstance();
