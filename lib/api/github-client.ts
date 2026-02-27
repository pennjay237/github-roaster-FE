import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const githubClient = axios.create({
  baseURL: GITHUB_API_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

export const githubApi = {
  getUserData: async (username: string) => {
    const response = await githubClient.get(`/users/${username}`);
    return response.data;
  },

  getUserRepos: async (username: string, params?: any) => {
    const response = await githubClient.get(`/users/${username}/repos`, { params });
    return response.data;
  },

  searchUsers: async (query: string) => {
    const response = await githubClient.get('/search/users', {
      params: { q: query },
    });
    return response.data;
  },
};