import axios from 'axios';
import { roastResponseSchemaRelaxed } from '../schemas/roast.schema';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const backendClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
backendClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('📤 Request data:', config.data || config.params);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
backendClient.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    console.log('📥 Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

// Add a function to generate roasts
export async function generateRoast(username: string, temperature: number = 0.7, customInstructions?: string) {
  try {
    console.log(`🎯 Generating roast for: ${username}`);
    
    const response = await backendClient.get(`/roast/${username}`, {
      params: {
        temperature,
        ...(customInstructions && { customInstructions }),
      },
    });

    console.log('📊 Raw response:', response.data);

    // Your backend returns the data directly, not wrapped in a data property
    // So we need to handle both cases
    const rawData = response.data;
    
    // Check if the response already has the expected structure
    if (rawData && typeof rawData === 'object' && 'roast' in rawData) {
      // Already in correct format
      const result = roastResponseSchemaRelaxed.safeParse(rawData);
      
      if (result.success) {
        console.log('✅ Valid roast response');
        return result.data;
      } else {
        console.warn('⚠️ Invalid response structure:', result.error);
        // Return as-is with fallback
        return {
          ...rawData,
          metadata: rawData.metadata || {
            generatedAt: new Date().toISOString(),
            model: 'gemini-pro',
            temperature,
            disclaimer: 'This roast is AI-generated and intended for entertainment only.',
          },
        };
      }
    } else {
      // Backend returned something unexpected
      console.warn('⚠️ Unexpected response format, using mock data');
      return {
        roast: `🔥 GitHub Roast of ${username} 🔥\n\nLooks like the roast machine needs some debugging! But don't worry, ${username}, your code is probably cleaner than our API response formatting! 💻`,
        data: {
          username,
          name: username,
          bio: 'Bio not available',
          publicRepos: 0,
          followers: 0,
          following: 0,
          accountYears: 0,
          mostUsedLanguage: 'Unknown',
          mostStarredRepo: 'None',
          repoActivity: 'unknown',
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          model: 'mock-model',
          temperature,
          disclaimer: 'This roast is AI-generated and intended for entertainment only.',
        },
      };
    }
  } catch (error: any) {
    console.error('❌ Error fetching roast:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    
    // Return mock data on error
    return {
      roast: `🔥 Mock Roast for ${username} 🔥\n\nWell hello there, ${username}! I see you're a GitHub user with... well, with a GitHub account! Your commit history looks as mysterious as my morning coffee before I've had my first sip. But hey, at least you're here, and that's what counts! 🚀\n\n(Note: This is a mock response. Check if backend is running on http://localhost:3001)`,
      data: {
        username,
        name: username,
        bio: 'Bio not available (error occurred)',
        publicRepos: 0,
        followers: 0,
        following: 0,
        accountYears: 0,
        mostUsedLanguage: 'Unknown',
        mostStarredRepo: 'None',
        repoActivity: 'unknown',
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        model: 'mock-error-model',
        temperature,
        disclaimer: 'This roast is AI-generated and intended for entertainment only.',
      },
    };
  }
}