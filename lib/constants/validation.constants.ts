export const VALIDATION_CONSTANTS = {
  GITHUB_USERNAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 39,
    PATTERN: /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/,
    ERROR_MESSAGES: {
      REQUIRED: 'GitHub username is required',
      INVALID: 'Invalid GitHub username format. Use only letters, numbers, and hyphens (not at start/end).',
      TOO_LONG: 'Username must be less than 40 characters',
      TOO_SHORT: 'Username must be at least 1 character',
    },
  },
  
  TEMPERATURE: {
    MIN: 0.0,    
    MAX: 1.0,     
    STEP: 0.1,
    DEFAULT: 0.7,
    ERROR_MESSAGES: {
      INVALID: 'Creativity level must be between 0.0 and 1.0',
    },
    LABELS: {
      '0.0': 'Deterministic',
      '0.3': 'Conservative',
      '0.7': 'Balanced',
      '1.0': 'Creative',
    },
  },
  
  CUSTOM_INSTRUCTIONS: {
    MAX_LENGTH: 200,
    ERROR_MESSAGES: {
      TOO_LONG: 'Custom instructions must be less than 200 characters',
    },
  },
  
  API: {
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 2,
  },
} as const;

export function getTemperatureLabel(value: number): string {
  if (value <= 0.2) return VALIDATION_CONSTANTS.TEMPERATURE.LABELS['0.0'];
  if (value <= 0.5) return VALIDATION_CONSTANTS.TEMPERATURE.LABELS['0.3'];
  if (value <= 0.9) return VALIDATION_CONSTANTS.TEMPERATURE.LABELS['0.7'];
  return VALIDATION_CONSTANTS.TEMPERATURE.LABELS['1.0'];
}

export function getTemperatureColor(value: number): string {
  if (value <= 0.2) return 'text-gray-500';
  if (value <= 0.5) return 'text-blue-500';
  if (value <= 0.9) return 'text-purple-500';
  return 'text-pink-500';
}