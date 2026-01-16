import { useMutation } from '@tanstack/react-query';
import { backendClient, generateRoast } from '@/lib/api/backend-client';
import { roastResponseSchemaRelaxed } from '@/lib/schemas/roast.schema';

export interface GenerateRoastParams {
  username: string;
  temperature?: number;
  customInstructions?: string;
}

export const useGenerateRoast = () => {
  return useMutation({
    mutationFn: async ({ username, temperature = 0.7, customInstructions }: GenerateRoastParams) => {
      console.log(`🔧 Starting roast generation for: ${username}`);
      console.log(`🔧 Temperature: ${temperature}`);
      console.log(`🔧 Backend URL: http://localhost:3001/roast/${username}`);
      
      try {
        const response = await backendClient.get(`/roast/${username}`, {
          params: {
            temperature,
            ...(customInstructions && { customInstructions }),
          },
        });

        console.log('✅ Backend response received:', response.data);
        console.log('✅ Response status:', response.status);
        console.log('✅ Has data property?', !!response.data);
        console.log('✅ Data type:', typeof response.data);
        
        // Check what the backend actually returns
        const backendData = response.data;
        
        console.log('🔍 Checking backendData structure:');
        console.log('  - Has "roast" property?', backendData && 'roast' in backendData);
        console.log('  - Has "data" property?', backendData && 'data' in backendData);
        console.log('  - Has "metadata" property?', backendData && 'metadata' in backendData);
        
        // Check if backendData is a string (possible error case)
        if (typeof backendData === 'string') {
          console.warn('⚠️ Backend returned a string instead of object:', backendData);
          return {
            roast: `🔥 Debug: Backend returned string\n\n${backendData}`,
            data: {
              username,
              name: username,
              bio: 'Debug - string response',
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
              model: 'debug-string',
              temperature: temperature,
              disclaimer: 'Debug roast - backend returned string',
            },
          };
        }
        
        // The backend returns the full object with roast, data, metadata properties
        // So we should return it as-is
        return backendData;
        
      } catch (error: any) {
        console.error('❌ Backend error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
        });
        
        // Return mock data for testing
        return {
          roast: `🔥 Debug Roast for ${username} 🔥\n\nThis is a debug roast to test the frontend display.\n\nBackend returned error: ${error.message}\n\nStatus: ${error.response?.status || 'Unknown'}`,
          data: {
            username,
            name: username,
            bio: 'Debug bio',
            publicRepos: 42,
            followers: 100,
            following: 50,
            accountYears: 2,
            mostUsedLanguage: 'JavaScript',
            mostStarredRepo: 'debug-repo',
            repoActivity: 'active',
          },
          metadata: {
            generatedAt: new Date().toISOString(),
            model: 'debug-model',
            temperature: temperature,
            disclaimer: 'Debug roast for testing',
          },
        };
      }
    },
    onSuccess: (data) => {
      console.log('🎉 Mutation success - Data received:', data);
      console.log('🎉 Mutation success - Data type:', typeof data);
      console.log('🎉 Mutation success - Has roast?', data && 'roast' in data);
    },
    onError: (error) => {
      console.error('🔥 Mutation error:', error);
      console.error('🔥 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    },
  });
};

// For backward compatibility
export const useRoast = useGenerateRoast;