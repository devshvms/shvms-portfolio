import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Grow,
  InputAdornment,
  Fab,
  Alert,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon,
  Chat as ChatIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, ChatState } from './types';
import { createChatSession, sendMessage } from '../../services/geminiService';
import { contextService } from '../../services/contextService';
import { chatSessionService } from '../../services/chatSessionService';


const ChatContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}));

const ChatBar = styled(Paper)<{ expanded: boolean }>(({ theme, expanded }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: expanded ? '16px' : '50%',
  padding: expanded ? '20px' : '0',
  width: expanded ? '480px' : '56px',
  height: expanded ? '600px' : '56px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  border: `1px solid ${theme.palette.secondary.light}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
  paddingBottom: '16px',
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
}));

const ChatMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  marginBottom: '20px',
  padding: '12px 0',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
}));

const Message = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  marginBottom: '16px',
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  maxWidth: '70%',
  padding: '16px 20px',
  borderRadius: '20px',
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.secondary.light,
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  fontSize: '15px',
  lineHeight: 1.5,
  wordWrap: 'break-word',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '24px',
    height: '40px',
    '& fieldset': {
      borderColor: theme.palette.secondary.light,
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    fontSize: '14px',
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
}));

const FloatingChatButton = styled(Fab)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: '56px',
  height: '56px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.1)',
  },
  transition: 'all 0.2s ease-in-out',
}));

const ChatModule: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    currentSession: null,
    isInitialized: false,
    maxMessages: 30
  });
  const [isTyping, setIsTyping] = useState(false);
  const [geminiSession, setGeminiSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat session when component mounts
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Load existing session or create new one
        const savedState = chatSessionService.loadSession();
        
        if (savedState.currentSession && savedState.isInitialized) {
          // Load existing session
          setChatState(savedState);
          
          // Initialize Gemini session
          const portfolioData = await contextService.initializeContext();
          if (portfolioData) {
            const session = createChatSession(portfolioData);
            setGeminiSession(session);
          }
        } else {
          // Create new session
          const portfolioData = await contextService.initializeContext();
          
          if (!portfolioData) {
            setError('Failed to load portfolio data. Please refresh the page.');
            return;
          }

          const geminiSession = createChatSession(portfolioData);
          setGeminiSession(geminiSession);
          
          // Create new chat session
          const newSession = chatSessionService.createSession();
          
          // Add initial greeting message
          const greetingMessage: ChatMessage = {
            id: '1',
            text: 'Hello! I\'m your AI assistant for Shivam\'s portfolio. I have access to all your portfolio information and can help answer questions about your skills, experiences, projects, and more. How can I help you today?',
            isUser: false,
            timestamp: new Date(),
          };
          
          const updatedSession = chatSessionService.addMessage(newSession, greetingMessage);
          
          setChatState({
            currentSession: updatedSession,
            isInitialized: true,
            maxMessages: 30
          });
        }
      } catch (err) {
        setError('Failed to initialize AI assistant. Please check your API key and portfolio data.');
        console.error('Error initializing chat:', err);
      }
    };

    if (expanded && !chatState.isInitialized) {
      initializeChat();
    }
  }, [expanded, chatState.isInitialized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.currentSession?.messages]);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  const handleSendMessage = async () => {
    if (!message.trim() || !geminiSession || !chatState.currentSession) return;

    // Check message limit
    if (!chatSessionService.canAddMessage(chatState.currentSession)) {
      setError(`Message limit reached (${chatState.maxMessages} messages). Please start a new session.`);
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    // Add user message to session
    const updatedSession = chatSessionService.addMessage(chatState.currentSession, userMessage);
    setChatState(prev => ({
      ...prev,
      currentSession: updatedSession
    }));
    
    setMessage('');
    setIsTyping(true);
    setError(null);

    try {
      // Get portfolio data for context
      const portfolioData = contextService.getPortfolioData();
      
      // Send message to Gemini AI with portfolio context
      const aiResponse = await sendMessage(geminiSession, userMessage.text, portfolioData || undefined);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      // Add AI response to session
      const finalSession = chatSessionService.addMessage(updatedSession, aiMessage);
      setChatState(prev => ({
        ...prev,
        currentSession: finalSession
      }));
    } catch (err) {
      setError('Failed to get response from AI. Please try again.');
      console.error('Error getting AI response:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  const startNewSession = () => {
    chatSessionService.clearSession();
    setChatState({
      currentSession: null,
      isInitialized: false,
      maxMessages: 30
    });
    setGeminiSession(null);
    setError(null);
  };

  return (
    <ChatContainer>
      <Grow in={true} timeout={500}>
        <ChatBar expanded={expanded}>
          {expanded ? (
            <>
              <ChatHeader>
                <Box display="flex" alignItems="center" gap={2}>
                  <ChatIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                  <Box>
                    <Typography variant="h6" color="text.primary" fontWeight={600}>
                      Gemini AI Assistant
                    </Typography>
                    {chatState.currentSession && (
                      <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                        <Chip
                          size="small"
                          label={`${chatState.currentSession.messageCount}/${chatState.maxMessages} messages`}
                          color={chatSessionService.getSessionStats(chatState.currentSession).isNearLimit ? 'warning' : 'default'}
                          variant="outlined"
                        />
                        {chatSessionService.getSessionStats(chatState.currentSession).isNearLimit && (
                          <Tooltip title="Message limit almost reached">
                            <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                          </Tooltip>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box display="flex" gap={1}>
                  <Tooltip title="Start new session">
                    <IconButton
                      onClick={startNewSession}
                      size="small"
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { 
                          color: 'primary.main',
                          backgroundColor: 'rgba(239, 196, 48, 0.1)',
                        },
                      }}
                    >
                      <ChatIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    onClick={handleClose}
                    size="medium"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { 
                        color: 'primary.main',
                        backgroundColor: 'rgba(239, 196, 48, 0.1)',
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </ChatHeader>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <ChatMessages>
                {chatState.currentSession?.messages.map((msg) => (
                  <Message key={msg.id} isUser={msg.isUser}>
                    <MessageBubble isUser={msg.isUser}>
                      {msg.isUser ? (
                        msg.text
                      ) : (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <Box sx={{ mb: 1 }}>{children}</Box>,
                            strong: ({ children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
                            em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
                            code: ({ children }) => (
                              <code style={{ 
                                backgroundColor: 'rgba(0,0,0,0.1)', 
                                padding: '2px 4px', 
                                borderRadius: '3px',
                                fontSize: '0.9em'
                              }}>
                                {children}
                              </code>
                            ),
                            ul: ({ children }) => <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>{children}</ul>,
                            ol: ({ children }) => <ol style={{ margin: '8px 0', paddingLeft: '20px' }}>{children}</ol>,
                            li: ({ children }) => <li style={{ margin: '4px 0' }}>{children}</li>,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      )}
                    </MessageBubble>
                  </Message>
                ))}
                {isTyping && (
                  <Message isUser={false}>
                    <MessageBubble isUser={false}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box
                          sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            animation: 'pulse 1.5s ease-in-out infinite',
                          }}
                        />
                        <Box
                          sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            animation: 'pulse 1.5s ease-in-out infinite 0.2s',
                          }}
                        />
                        <Box
                          sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            animation: 'pulse 1.5s ease-in-out infinite 0.4s',
                          }}
                        />
                      </Box>
                    </MessageBubble>
                  </Message>
                )}
                <div ref={messagesEndRef} />
              </ChatMessages>

              <Box display="flex" flexDirection="column" gap={1}>
                <StyledTextField
                  ref={inputRef}
                  fullWidth
                  placeholder={
                    chatState.currentSession && !chatSessionService.canAddMessage(chatState.currentSession)
                      ? "Message limit reached. Start new session."
                      : "Type your message..."
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!geminiSession || (chatState.currentSession ? !chatSessionService.canAddMessage(chatState.currentSession) : false)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleSendMessage}
                          disabled={
                            !message.trim() || 
                            !geminiSession || 
                            isTyping || 
                            (chatState.currentSession ? !chatSessionService.canAddMessage(chatState.currentSession) : false)
                          }
                          sx={{
                            color: 'primary.main',
                            '&:hover': { 
                              backgroundColor: 'primary.main', 
                              color: 'primary.contrastText' 
                            },
                            '&.Mui-disabled': { color: 'text.secondary' },
                          }}
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {chatState.currentSession && chatSessionService.getSessionStats(chatState.currentSession).isNearLimit && (
                  <Typography variant="caption" color="warning.main" sx={{ textAlign: 'center' }}>
                    {chatSessionService.getRemainingMessages(chatState.currentSession)} messages remaining
                  </Typography>
                )}
              </Box>
            </>
          ) : (
            <FloatingChatButton
              onClick={toggleExpanded}
              aria-label="chat"
            >
              <ChatIcon />
            </FloatingChatButton>
          )}
        </ChatBar>
      </Grow>

      <style>
        {`
          @keyframes pulse {
            0%, 80%, 100% {
              opacity: 0.4;
            }
            40% {
              opacity: 1;
            }
          }
        `}
      </style>
    </ChatContainer>
  );
};

export default ChatModule;
