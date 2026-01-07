import { VALIDATION_CONSTANTS } from '../constants/validation.constants';

export function isValidGitHubUsername(username: string): boolean {
  return VALIDATION_CONSTANTS.GITHUB_USERNAME.PATTERN.test(username);
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

  if (username.length > VALIDATION_CONSTANTS.GITHUB_USERNAME.MAX_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_CONSTANTS.GITHUB_USERNAME.ERROR_MESSAGES.TOO_LONG,
    };
  }

  if (!isValidGitHubUsername(username)) {
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