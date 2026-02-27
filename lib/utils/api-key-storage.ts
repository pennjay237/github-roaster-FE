const STORAGE_KEY = 'gemini_user_api_key';

const encode = (str: string): string => {
  return btoa(str);
};

const decode = (str: string): string => {
  try {
    return atob(str);
  } catch {
    return '';
  }
};

export const apiKeyStorage = {
  save: (apiKey: string): void => {
    try {
      const encoded = encode(apiKey);
      localStorage.setItem(STORAGE_KEY, encoded);
    } catch (error) {
      console.error('Failed to save API key:', error);
    }
  },

  get: (): string | null => {
    try {
      const encoded = localStorage.getItem(STORAGE_KEY);
      if (!encoded) return null;
      return decode(encoded);
    } catch (error) {
      console.error('Failed to get API key:', error);
      return null;
    }
  },

  remove: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove API key:', error);
    }
  },

  has: (): boolean => {
    return !!apiKeyStorage.get();
  },
};