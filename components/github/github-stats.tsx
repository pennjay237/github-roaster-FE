'use client';

interface GithubStatsProps {
  data: any;
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
    if (!data || data.followers === 0) return '0.00';
    const rate = ((data.publicRepos + data.totalStars) / data.followers) * 100;
    return rate.toFixed(2);
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
              {formatDate(data.updatedAt || data.lastRepoUpdate)}
            </p>
          </div>
        </div>
      </div>

      {/* Engagement Stats Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-green-500">📈</span> Engagement
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Engagement Rate</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {calculateEngagementRate()}%
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Public Repos</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {data.publicRepos || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Stars</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {data.totalStars || 0}
              </p>
            </div>
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
            {data.mostUsedLanguageCount > 0 && (
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
            {data.mostStarredRepo?.stars > 0 && (
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