import { VALIDATION_CONSTANTS } from '../constants/validation.constants';

export function isValidGitHubUsername(username: string): boolean {
  return VALIDATION_CONSTANTS.GITHUB_USERNAME.PATTERN.test(username.trim());
}

export function validateTemperature(temperature: number): {
  isValid: boolean;
  error?: string;
} {
  if (temperature < VALIDATION_CONSTANTS.TEMPERATURE.MIN || 
      temperature > VALIDATION_CONSTANTS.TEMPERATURE.MAX) {
    return {
      isValid: false,
      error: VALIDATION_CONSTANTS.TEMPERATURE.ERROR_MESSAGES.INVALID,
    };
  }
  
  if (isNaN(temperature)) {
    return {
      isValid: false,
      error: 'Temperature must be a valid number',
    };
  }
  
  return { isValid: true };
}

export function validateUsername(username: string): {
  isValid: boolean;
  error?: string;
} {
  if (!username || username.trim().length === 0) {
    return {
      isValid: false,
      error: VALIDATION_CONSTANTS.GITHUB_USERNAME.ERROR_MESSAGES.REQUIRED,
    };
  }

  const trimmedUsername = username.trim();
  
  if (trimmedUsername.length > VALIDATION_CONSTANTS.GITHUB_USERNAME.MAX_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_CONSTANTS.GITHUB_USERNAME.ERROR_MESSAGES.TOO_LONG,
    };
  }

  if (!isValidGitHubUsername(trimmedUsername)) {
    return {
      isValid: false,
      error: VALIDATION_CONSTANTS.GITHUB_USERNAME.ERROR_MESSAGES.INVALID,
    };
  }

  return { isValid: true };
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 500);
}

export function validateCustomInstructions(instructions: string): {
  isValid: boolean;
  error?: string;
} {
  if (!instructions || instructions.trim().length === 0) {
    return { isValid: true };
  }

  if (instructions.length > VALIDATION_CONSTANTS.CUSTOM_INSTRUCTIONS.MAX_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_CONSTANTS.CUSTOM_INSTRUCTIONS.ERROR_MESSAGES.TOO_LONG,
    };
  }

  return { isValid: true };
}

export function getDefaultTemperature(): number {
  return VALIDATION_CONSTANTS.TEMPERATURE.DEFAULT;
}

export function formatTemperature(temperature: number): string {
  return temperature.toFixed(1);
}