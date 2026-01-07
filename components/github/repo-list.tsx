import { Star, GitFork, Calendar, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitHubRepo } from '@/lib/types/github.types';
import { formatDate } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface RepoListProps {
  repos: GitHubRepo[];
  className?: string;
  maxItems?: number;
}

export function RepoList({ repos, className, maxItems = 5 }: RepoListProps) {
  const displayRepos = repos.slice(0, maxItems);

  if (displayRepos.length === 0) {
    return (
      <Card className={cn('border-purple-200 dark:border-purple-800', className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Recent Repositories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No repositories found
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('border-purple-200 dark:border-purple-800', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Recent Repositories
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {displayRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors group-hover:bg-gray-50 dark:group-hover:bg-gray-900/50">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {repo.name}
                  </h4>
                  {repo.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                      {repo.description}
                    </p>
                  )}
                </div>
                {repo.language && (
                  <Badge variant="outline" className="flex-shrink-0">
                    {repo.language}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(repo.updated_at)}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
        
        {repos.length > maxItems && (
          <div className="text-center pt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              +{repos.length - maxItems} more repositories
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}