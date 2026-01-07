import { GitHubData } from './github.types';

export interface RoastResponse {
  roast: string;
  githubData: GitHubData;
  disclaimer: string;
  generatedAt: string;
  model: string;
  temperature: number;
}

export interface RoastRequest {
  username: string;
  temperature?: number;
  customInstructions?: string;
}

export interface RoastHistoryItem extends RoastResponse {
  id: string;
  viewedAt: string;
}

export interface RoastMetrics {
  totalRoasts: number;
  averageTemperature: number;
  mostRoastedUser: string;
  totalCharacters: number;
  lastRoastDate: string;
}