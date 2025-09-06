import { GoogleGenAI } from "@google/genai";
import { PortfolioData } from '../resources/dataService';

// Initialize the Google GenAI client
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
if (!apiKey) {
  console.error('Gemini API key is missing! Please check your .env file.');
}

const ai = new GoogleGenAI({
  apiKey: apiKey || '',
});

// Function implementations
const functionImplementations = {  
  get_portfolio_context: async (section: string, portfolioData: PortfolioData) => {
    try {
      switch (section) {
        case "personal":
          return { success: true, data: portfolioData.personal };
        case "skills":
          return { success: true, data: portfolioData.skills };
        case "experiences":
          return { success: true, data: portfolioData.experiences };
        case "works":
          return { success: true, data: portfolioData.works };
        case "social":
          return { success: true, data: portfolioData.social };
        case "intro":
          return { success: true, data: portfolioData.intro };
        case "contact":
          return { success: true, data: portfolioData.contact };
        case "all":
          return { success: true, data: portfolioData };
        default:
          return { success: false, error: "Invalid section specified" };
      }
    } catch (error) {
      return { success: false, error: "Failed to retrieve portfolio context" };
    }
  }
};

// Create a chat session for multi-turn conversations with portfolio context
export const createChatSession = (portfolioData: PortfolioData) => {
  if (!apiKey) {
    throw new Error('Gemini API key is missing. Please check your .env file and restart the development server.');
  }
  
  // Format portfolio data for context
  const contextPrompt = `
You are an AI assistant for ${portfolioData.personal.name}'s portfolio website. You have access to the following portfolio information:

PERSONAL INFORMATION:
- Name: ${portfolioData.personal.name}
- Title: ${portfolioData.personal.title}
- Tagline: ${portfolioData.personal.tagline}
- Email: ${portfolioData.personal.email}
- Location: ${portfolioData.personal.location}
- Bio: ${portfolioData.personal.bio}

SKILLS:
${portfolioData.skills.categories.map(cat => `- ${cat.title}: ${cat.description}`).join('\n')}

EXPERIENCES:
${portfolioData.experiences.map(exp => 
  `- ${exp.position} at ${exp.company} (${exp.duration})
    Technologies: ${exp.technologies.join(', ')}
    Description: ${exp.description.join(' ')}`
).join('\n')}

PROJECTS/WORKS:
${portfolioData.works.map(work => 
  `- ${work.title}: ${work.description}
    Technologies: ${work.technologies.join(', ')}
    ${work.githubUrl ? `GitHub: ${work.githubUrl}` : ''}
    ${work.liveUrl ? `Live URL: ${work.liveUrl}` : ''}`
).join('\n')}

SOCIAL PROFILES:
${portfolioData.social.profiles.map(profile => 
  `- ${profile.name}: ${profile.url}`
).join('\n')}

You can also use tools to scrape additional information from GitHub repositories and LinkedIn profiles mentioned in the portfolio data. Always be helpful and provide accurate information based on the portfolio data provided.
Strictly try to give sort and precse answers, average response length 30 words and max 70.

Current DateTime ISO: ${new Date().toISOString()}
`;

  return ai.chats.create({
    model: "gemini-2.5-flash",
    history: [
      {
        role: "user",
        parts: [{ text: contextPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "Hello! I'm your AI assistant for Shivam's portfolio. I have access to all your portfolio information and can help answer questions about your skills, experiences, projects, and more. I can also scrape additional information from your GitHub repositories and LinkedIn profile when needed. How can I help you today?" }],
      },
    ],
  });
};

// Send a message and get response with tool calling support
export const sendMessage = async (chat: any, message: string, portfolioData?: PortfolioData) => {
  try {
    if (!apiKey) {
      throw new Error('Gemini API key is missing. Please check your .env file and restart the development server.');
    }
    
    const response = await chat.sendMessageStream({
      message: message,
    });
    
    let fullResponse = '';
    let toolCalls: any[] = [];
    
    for await (const chunk of response) {
      if (chunk.text) {
        fullResponse += chunk.text;
      }
      
      // Check for tool calls
      if (chunk.functionCalls) {
        toolCalls = chunk.functionCalls;
      }
    }
    
    // Handle tool calls if any
    if (toolCalls && toolCalls.length > 0) {
      const toolResults = [];
      
      for (const toolCall of toolCalls) {
        const { name, args } = toolCall;
        
        if (name === 'get_portfolio_context' && portfolioData) {
          const result = await functionImplementations.get_portfolio_context(args.section, portfolioData);
          toolResults.push({
            name,
            response: result
          });
        }
      }
      
      // Send tool results back to the model
      if (toolResults.length > 0) {
        const toolResponse = await chat.sendMessageStream({
          message: toolResults.map(result => 
            `Tool ${result.name} result: ${JSON.stringify(result.response)}`
          ).join('\n')
        });
        
        let toolResponseText = '';
        for await (const chunk of toolResponse) {
          if (chunk.text) {
            toolResponseText += chunk.text;
          }
        }
        
        fullResponse += '\n\n' + toolResponseText;
      }
    }
    
    return fullResponse;
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    if (error instanceof Error && error.message.includes('API key')) {
      return 'Configuration error: API key is missing. Please check your setup and restart the server.';
    }
    return 'Sorry, I encountered an error. Please try again.';
  }
};

// Get chat history
export const getChatHistory = (chat: any) => {
  try {
    return chat.getHistory();
  } catch (error) {
    console.error('Error getting chat history:', error);
    return [];
  }
};
