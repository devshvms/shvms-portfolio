# Gemini AI Integration Setup

## Prerequisites

1. **Google AI Studio Account**: Sign up at [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **API Key**: Generate an API key from the Google AI Studio dashboard

## Configuration

### Option 1: GitHub Actions (Recommended for Production)

1. **Repository Secrets**: Add your Gemini API key to GitHub repository secrets:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `REACT_APP_GEMINI_API_KEY`
   - Value: Your actual Gemini API key
   - Click "Add secret"

2. **Automatic Deployment**: The API key will be automatically available during GitHub Actions builds

### Option 2: Local Development

1. **Create Environment File**: Create a `.env` file in your project root
2. **Add API Key**: Add your Gemini API key to the `.env` file:

```bash
# .env
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

3. **Restart Development Server**: After adding the API key, restart your development server

## GitHub Actions Integration

The project includes GitHub Actions workflows that automatically:
- Use the `REACT_APP_GEMINI_API_KEY` secret during builds
- Deploy to Firebase Hosting with the API key properly configured
- Handle both merge and pull request deployments

## Features

- **Multi-turn Conversations**: Maintains conversation context across messages
- **Real-time AI Responses**: Powered by Google's Gemini 2.5 Flash model
- **Error Handling**: Graceful fallbacks for API issues
- **Streaming Support**: Real-time response generation
- **Secure Deployment**: API keys managed via GitHub secrets

## Usage

1. Click the floating chat icon in the bottom-right corner
2. Type your message and press Enter or click Send
3. The AI will respond with context-aware replies
4. Continue the conversation naturally

## Troubleshooting

- **API Key Issues**: Ensure your API key is valid and has sufficient quota
- **Network Errors**: Check your internet connection and API endpoint accessibility
- **Rate Limits**: Be aware of Google's API rate limits and usage quotas
- **GitHub Actions**: Verify the secret is properly set in repository settings

## Security Notes

- Never commit your `.env` file to version control (already in .gitignore)
- API keys in GitHub secrets are encrypted and secure
- Keep your API key secure and rotate it regularly
- Monitor your API usage to avoid unexpected charges
