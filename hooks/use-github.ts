import { useQuery } from '@tanstack/react-query';
import { githubClient } from '@/lib/api/github-client';
import { GitHubData } from '@/lib/types/github.types';

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ['github-user', username],
    queryFn: () => githubClient.getUserData(username),
    enabled: !!username && username.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: ['github-repos', username],
    queryFn: () => githubClient.getUserRepos(username),
    enabled: !!username && username.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

export function useGitHubStats(username: string) {
  const userQuery = useGitHubUser(username);
  const reposQuery = useGitHubRepos(username);

  return {
    user: userQuery.data,
    repos: reposQuery.data,
    isLoading: userQuery.isLoading || reposQuery.isLoading,
    error: userQuery.error || reposQuery.error,
    refetch: () => {
      userQuery.refetch();
      reposQuery.refetch();
    },
  };
}