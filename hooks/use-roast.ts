import { useMutation } from '@tanstack/react-query';
import { backendClient } from '@/lib/api/backend-client';

export interface GenerateRoastParams {
  username: string;
  temperature?: number;
  customInstructions?: string;
}

export const useGenerateRoast = () => {
  return useMutation({
    mutationFn: async ({ username, temperature = 0.7, customInstructions }: GenerateRoastParams) => {
      console.log(`🔧 Generating roast for: ${username} (temp: ${temperature})`);
      
      const response = await backendClient.get(`/roast/${username}`, {
        params: {
          temperature,
          ...(customInstructions && { customInstructions }),
        },
      });

      console.log(' Backend response:', response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('🎉 Roast generated successfully!');
      console.log(' Roast length:', data.roast?.length);
    },
    onError: (error: any) => {
      console.error('❌ Failed to generate roast:', error.message);
    },
  });
};

export const useRoast = useGenerateRoast;