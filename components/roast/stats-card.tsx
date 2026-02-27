import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitHubData } from '@/lib/types/github.types';
import { cn } from '@/lib/utils/cn';

interface StatsCardProps {
  data: GitHubData;
  className?: string;
}

export function StatsCard({ data, className }: StatsCardProps) {
  const stats = [
    {
      label: 'Repositories',
      value: data.publicRepos,
      change: '+2 this month',
      trend: 'up' as const,
    },
    {
      label: 'Followers',
      value: data.followers,
      change: '+12 this week',
      trend: 'up' as const,
    },
    {
      label: 'Following',
      value: data.following,
      change: 'No change',
      trend: 'stable' as const,
    },
    {
      label: 'Stars',
      value: data.totalStars,
      change: '+24 this month',
      trend: 'up' as const,
    },
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className={cn('border-blue-200 dark:border-blue-800', className)}>
      <CardHeader>
        <CardTitle className="text-lg">Activity Stats</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </span>
                {getTrendIcon(stat.trend)}
              </div>
              <div className="text-2xl font-bold">{stat.value !== undefined ? stat.value.toLocaleString() : '0'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Activity Level */}
        <div>
          <h4 className="font-semibold mb-3">Activity Level</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Active Repos</span>
              <span className="font-medium">{data.repoActivity?.active || 0}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                style={{
                  width: `${((data.repoActivity?.active || 0) / (data.publicRepos || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div>
          <h4 className="font-semibold mb-3">Quick Facts</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {data.accountAge || 'New'} on GitHub
            </Badge>
            {data.isHireable && (
              <Badge variant="success">Open to work</Badge>
            )}
            {data.hasBlog && (
              <Badge variant="outline">Has blog</Badge>
            )}
            <Badge variant="info">
              {data.mostUsedLanguage || 'No language'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}