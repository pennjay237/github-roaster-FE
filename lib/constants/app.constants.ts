export const APP_CONSTANTS = {
  APP_NAME: 'GitHub Roast AI',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-powered humorous roasts of GitHub users',
  TAGS: ['GitHub', 'AI', 'Roast', 'Developer', 'Humor'],
  
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 2,
  },
  
  FEATURES: {
    ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    ENABLE_DARK_MODE: true,
    ENABLE_SHARING: true,
    ENABLE_HISTORY: true,
  },
  
  UI: {
    MAX_USERNAME_LENGTH: 39,
    MIN_TEMPERATURE: 0.1,
    MAX_TEMPERATURE: 2.0,
    DEFAULT_TEMPERATURE: 0.7,
    ANIMATION_DURATION: 300,
  },
  
  SOCIAL: {
    TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE || 'githubroastai',
    GITHUB_REPO: 'https://github.com/yourusername/github-roast-ai',
  },
} as const;