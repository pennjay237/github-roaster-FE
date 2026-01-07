export const VALIDATION_CONSTANTS = {
  GITHUB_USERNAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 39,
    PATTERN: /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/,
    ERROR_MESSAGES: {
      REQUIRED: 'GitHub username is required',
      INVALID: 'Invalid GitHub username format',
      TOO_LONG: 'Username must be less than 40 characters',
      TOO_SHORT: 'Username must be at least 1 character',
    },
  },
  
  TEMPERATURE: {
    MIN: 0.1,
    MAX: 2.0,
    STEP: 0.1,
    DEFAULT: 0.7,
    ERROR_MESSAGES: {
      INVALID: 'Temperature must be between 0.1 and 2.0',
    },
  },
  
  CUSTOM_INSTRUCTIONS: {
    MAX_LENGTH: 200,
    ERROR_MESSAGES: {
      TOO_LONG: 'Custom instructions must be less than 200 characters',
    },
  },
} as const;