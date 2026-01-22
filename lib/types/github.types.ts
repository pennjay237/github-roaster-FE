export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  size: number;
}


export interface GitHubData {
  username: string;
  avatarUrl: string;
  profileUrl: string;
  createdAt: string;
  name?: string;
  bio?: string;
  email?: string;
  location?: string;
  company?: string;
  blog?: string;
  publicRepos?: number;
  followers?: number;
  following?: number;
  totalStars?: number;
  accountYears?: number;
  updatedAt?: string;
  lastRepoUpdate?: string;
  
  mostUsedLanguage?: string;
  mostUsedLanguageCount?: number;
  mostStarredRepo?: {
    name: string;
    stars: number;
  };
    [key: string]: any;
}

export interface GitHubStats {
  user: GitHubUser;
  repos: GitHubRepo[];
  languages: Record<string, number>;
  totalStars: number;
  totalForks: number;
  mostUsedLanguage: string | null;
}