import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { backendClient } from '@/lib/api/backend-client';
import { RoastResponse } from '@/lib/types/roast.types';
import { useLocalStorage } from './use-local-storage';
import toast from 'react-hot-toast';

export function useRoast() {
  const queryClient = useQueryClient();
  const [, setHistory] = useLocalStorage<RoastResponse[]>('roast-history', []);

  const mutation = useMutation({
    mutationFn: async ({ username, temperature }: { username: string; temperature: number }) => {
      const response = await backendClient.post<RoastResponse>('/roast', {
        username,
        temperature,
      });
      return response.data;
    },
    
    onMutate: () => {
      toast.loading('Generating your roast...', {
        id: 'roast-loading',
      });
    },
    
    onSuccess: (data) => {
      toast.success('Roast generated successfully!', {
        id: 'roast-loading',
      });
      
      // Update cache
      queryClient.setQueryData(['roast', data.githubData.username], data);
      
      // Add to history
      setHistory((prev) => [data, ...(prev || []).slice(0, 49)]);
    },
    
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to generate roast', {
        id: 'roast-loading',
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
  });
}