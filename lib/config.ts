const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const config = {
  api: {
    baseUrl: API_BASE_URL,
    endpoints: {
      roast: (username: string, temperature: number = 0.7) => 
        `${API_BASE_URL}/roast/${username}?temperature=${temperature}`,
      health: `${API_BASE_URL}/health`,
    }
  }
};