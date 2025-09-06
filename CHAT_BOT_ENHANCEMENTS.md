# Chat Bot Enhancements

This document describes the enhancements made to the portfolio chat bot, including context injection and web scraping capabilities.

## Features Added

### 1. Portfolio Context Injection
- **Context Service**: Automatically fetches and formats portfolio data from Firestore
- **Dynamic Context**: The AI assistant has access to all portfolio information including:
  - Personal information (name, title, bio, contact details)
  - Skills and technologies
  - Work experiences
  - Projects and works
  - Social profiles
  - Contact information

### 2. Web Scraping Tools
- **GitHub Repository Scraping**: Can extract information from GitHub repositories
- **LinkedIn Profile Scraping**: Can extract information from LinkedIn profiles
- **Caching**: Implements intelligent caching to avoid repeated requests
- **Fallback Support**: Graceful degradation when scraping services are unavailable

### 3. Enhanced AI Capabilities
- **Tool Calling**: The AI can automatically call tools to gather additional information
- **Context-Aware Responses**: Responses are based on actual portfolio data
- **Dynamic Information**: Can provide real-time information about projects and profiles

## Architecture

### Services Created

1. **ContextService** (`src/services/contextService.ts`)
   - Manages portfolio data loading and formatting
   - Provides formatted context for different sections
   - Handles data extraction for scraping

2. **WebScrapingService** (`src/services/webScrapingService.ts`)
   - Handles web scraping operations
   - Implements caching mechanism
   - Supports both backend and fallback modes

3. **Enhanced GeminiService** (`src/services/geminiService.ts`)
   - Updated to support tool calling
   - Injects portfolio context into AI prompts
   - Handles function implementations

### Backend Service (Optional)

A Node.js/Express backend service (`backend-scraping-example.js`) is provided for production web scraping:

```bash
# Install dependencies
npm install express cors puppeteer cheerio

# Run the service
node backend-scraping-example.js
```

## Configuration

### Environment Variables

Add these to your `.env` file:

```env
# Required
REACT_APP_GEMINI_API_KEY=your_gemini_api_key

# Optional - for web scraping backend
REACT_APP_SCRAPING_SERVICE_URL=http://localhost:3001
```

### GitHub Repository Secrets

The Gemini API key should be stored in GitHub repository secrets for deployment:
- Go to Repository Settings → Secrets and Actions → Repository secrets
- Add `REACT_APP_GEMINI_API_KEY` with your Gemini API key

## Usage

### For Users
The chat bot now provides:
- Accurate information about your portfolio
- Ability to answer questions about your skills and experience
- Information about your projects and their technologies
- Links to your GitHub repositories and LinkedIn profile

### For Developers

#### Adding New Tools
1. Define the tool in `geminiService.ts` tools array
2. Implement the function in `functionImplementations`
3. Add the tool call handling in `sendMessage` function

#### Adding New Context Sources
1. Update the `PortfolioData` interface in `dataService.ts`
2. Add formatting logic in `ContextService.getFormattedContext`
3. Update the context prompt in `createChatSession`

## Example Interactions

### Portfolio Questions
- "What are my main skills?"
- "Tell me about my work experience"
- "What projects have I worked on?"
- "What technologies do I use?"

### Web Scraping
- "Can you get information about my GitHub repository?"
- "What's the latest activity on my LinkedIn profile?"
- "Show me details about my portfolio projects"

## Production Deployment

### Frontend
The enhanced chat bot works out of the box with the existing deployment.

### Backend (Optional)
For full web scraping capabilities:

1. Deploy the backend service to a cloud provider
2. Update `REACT_APP_SCRAPING_SERVICE_URL` environment variable
3. Ensure CORS is configured for your domain

### Security Considerations
- The backend service should be secured with authentication
- Rate limiting should be implemented
- CORS should be properly configured
- Consider using a proxy service for production

## Troubleshooting

### Common Issues

1. **API Key Missing**: Ensure `REACT_APP_GEMINI_API_KEY` is set
2. **Portfolio Data Not Loading**: Check Firestore connection and data structure
3. **Scraping Not Working**: Verify backend service is running and accessible
4. **CORS Errors**: Ensure backend service has proper CORS configuration

### Debug Mode
Enable debug logging by setting:
```javascript
localStorage.setItem('debug', 'chat-bot');
```

## Future Enhancements

1. **Real-time Data**: Integrate with GitHub/LinkedIn APIs for live data
2. **More Platforms**: Add support for other professional platforms
3. **Analytics**: Track chat interactions and popular questions
4. **Customization**: Allow users to customize AI personality and responses
5. **Voice Interface**: Add voice input/output capabilities
