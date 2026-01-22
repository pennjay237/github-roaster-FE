'use client';

interface GitHubData {
  createdAt: string;
  updatedAt?: string;
  lastRepoUpdate?: string;
  accountYears?: number;
  publicRepos?: number;
  followers?: number;
  totalStars?: number;
  mostUsedLanguage?: string;
  mostUsedLanguageCount?: number;
  mostStarredRepo?: {
    name: string;
    stars: number;
  };
}

interface GithubStatsProps {
  data: GitHubData;
}

export default function GithubStats({ data }: GithubStatsProps) {
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'Invalid Date' || dateString === 'Never') return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown';
    }
  };

  const calculateEngagementRate = () => {
    if (!data || !data.followers || data.followers === 0) return '0.00';
    const repos = data.publicRepos || 0;
    const stars = data.totalStars || 0;
    const contributions = repos + stars;
    
    if (contributions === 0) return '0.00';
    
    const rate = (contributions / data.followers) * 100;
    return rate.toFixed(2);
  };

  const getEngagementLevel = () => {
    const rate = parseFloat(calculateEngagementRate());
    if (rate === 0) return { level: 'No engagement', color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-700' };
    if (rate < 10) return { level: 'Low', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' };
    if (rate < 50) return { level: 'Moderate', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    if (rate < 100) return { level: 'High', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' };
    return { level: 'Very High', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' };
  };

  if (!data) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const engagementLevel = getEngagementLevel();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Account Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-blue-500">📅</span> Account Info
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Joined GitHub</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {formatDate(data.createdAt)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ({data.accountYears || '0'} years ago)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last Activity</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {formatDate(data.updatedAt || data.lastRepoUpdate || '')}
            </p>
          </div>
        </div>
      </div>

      {/* Engagement Stats Card - ENHANCED */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-green-500">📈</span> Engagement Metrics
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Engagement Rate</p>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {calculateEngagementRate()}%
              </p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${engagementLevel.color} ${engagementLevel.bg}`}>
                {engagementLevel.level}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              (Repos + Stars) ÷ Followers × 100
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {data.followers || 0}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Repos</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {data.publicRepos || 0}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Stars</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {data.totalStars || 0}
              </p>
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">Formula:</span> 
              <code className="ml-1 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">
                ({data.publicRepos || 0} + {data.totalStars || 0}) / {data.followers || 1} × 100
              </code>
            </p>
          </div>
        </div>
      </div>

      {/* Language & Repo Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-purple-500">💻</span> Development
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Most Used Language</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {data.mostUsedLanguage || 'No languages detected'}
            </p>
            {(data.mostUsedLanguageCount && data.mostUsedLanguageCount > 0) && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Used in {data.mostUsedLanguageCount} repos
              </p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Most Starred Repo</p>
            <p className="font-medium text-gray-900 dark:text-white truncate">
              {data.mostStarredRepo?.name || 'None'}
            </p>
            {(data.mostStarredRepo?.stars && data.mostStarredRepo.stars > 0) && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ⭐ {data.mostStarredRepo.stars} stars
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}