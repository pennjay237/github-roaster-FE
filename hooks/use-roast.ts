import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { backendClient } from '@/lib/api/backend-client';
import { RoastResponse } from '@/lib/types/roast.types';
import { useLocalStorage } from './use-local-storage';
import toast from 'react-hot-toast';
import { roastResponseSchema } from '@/lib/schemas/roast.schema';

export function useRoast() {
  const queryClient = useQueryClient();
  const [, setHistory] = useLocalStorage<RoastResponse[]>('roast-history', []);

  const mutation = useMutation({
    mutationFn: async ({ username, temperature, customInstructions }: { 
      username: string; 
      temperature: number;
      customInstructions?: string;
    }) => {
      const response = await backendClient.post('/roast', {
        username: username.trim().toLowerCase(),
        temperature: parseFloat(temperature.toFixed(1)), 
        customInstructions: customInstructions?.trim(),
      });
      
      const validatedData = roastResponseSchema.parse(response.data);
      return validatedData;
    },
    
    onMutate: () => {
      toast.loading('Generating your roast with Gemini AI...', {
        id: 'roast-loading',
        duration: Infinity,
      });
    },
    
    onSuccess: (data) => {
      toast.success('Roast generated successfully! 🎉', {
        id: 'roast-loading',
        duration: 3000,
        icon: '🤖',
      });
      
      queryClient.setQueryData(['roast', data.githubData.username], data);
      
      setHistory((prev) => {
        const history = prev || [];
        return [data, ...history.slice(0, 49)];
      });
      
      toast.success(`Generated using ${data.model}`, {
        id: 'model-info',
        duration: 2000,
      });
    },
    
    onError: (error: Error) => {
      console.error('Roast generation error:', error);
      
      let errorMessage = error.message || 'Failed to generate roast';
      
      if (errorMessage.includes('rate limit')) {
        errorMessage = 'Gemini AI rate limit reached. Please try again in a minute.';
      } else if (errorMessage.includes('safety') || errorMessage.includes('filtered')) {
        errorMessage = 'Content filtered by Gemini safety settings. Please try different input.';
      } else if (errorMessage.includes('API key')) {
        errorMessage = 'Gemini AI service configuration issue. Please contact support.';
      }
      
      toast.error(errorMessage, {
        id: 'roast-loading',
        duration: 5000,
      });
    },
  });

  return {
    generateRoast: mutation.mutate,
    generateRoastAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}

export function useRoastHistory() {
  const [history] = useLocalStorage<RoastResponse[]>('roast-history', []);
  
  return useQuery({
    queryKey: ['roast-history'],
    queryFn: () => history || [],
    initialData: history || [],
    staleTime: 60 * 1000,
  });
}

export function useRoastByUsername(username: string) {
  return useQuery({
    queryKey: ['roast', username],
    queryFn: () => {
      const history = JSON.parse(localStorage.getItem('roast-history') || '[]') as RoastResponse[];
      return history.find((roast) => roast.githubData.username === username);
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, 
  });
}