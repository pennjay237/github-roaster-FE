import { 
  Star, 
  GitFork, 
  Users, 
  BookOpen, 
  Calendar,
  Code,
  TrendingUp,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitHubData } from '@/lib/types/github.types';
import { formatDate } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface GitHubStatsProps {
  data: GitHubData;
  className?: string;
}

export function GitHubStats({ data, className }: GitHubStatsProps) {
  const stats = [
    {
      label: 'Repositories',
      value: data.publicRepos,
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Followers',
      value: data.followers,
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Following',
      value: data.following,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      label: 'Stars',
      value: data.totalStars,
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      label: 'Forks',
      value: data.totalForks,
      icon: GitFork,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      label: 'Account Age',
      value: data.accountAge,
      icon: Calendar,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  ];

  const engagementRate = data.followers > 0 
    ? ((data.totalStars + data.totalForks) / data.followers).toFixed(2)
    : '0.00';

  const engagementPercentage = Math.min(parseFloat(engagementRate) * 10, 100);

  return (
    <Card className={cn('border-green-200 dark:border-green-800', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          GitHub Stats
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={cn('rounded-lg p-4 text-center', stat.bgColor)}
            >
              <stat.icon className={cn('h-8 w-8 mx-auto mb-2', stat.color)} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Engagement
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</span>
                <span className="font-medium">{engagementRate}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                  style={{ width: `${engagementPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Profile Info
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Joined</span>
                <span className="font-medium">{formatDate(data.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                <span className="font-medium">{formatDate(data.updatedAt)}</span>
              </div>
              {data.isHireable && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <Badge variant="success" className="text-xs">
                    Open to work
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}