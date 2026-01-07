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
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  accountAge: string;
  createdAt: string;
  updatedAt: string;
  recentRepos: GitHubRepo[];
  languages: Record<string, number>;
  totalStars: number;
  totalForks: number;
  mostUsedLanguage: string | null;
  repoActivity?: {
    active: number;
    inactive: number;
  };
  isHireable?: boolean;
  hasBlog?: boolean;
  hasEmail?: boolean;
  hasLocation?: boolean;
}

export interface GitHubStats {
  user: GitHubUser;
  repos: GitHubRepo[];
  languages: Record<string, number>;
  totalStars: number;
  totalForks: number;
  mostUsedLanguage: string | null;
}