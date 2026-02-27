import { cn } from '@/lib/utils/cn';

interface LanguageBadgeProps {
  language: string;
  count: number;
  percentage: number;
  className?: string;
}

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  TypeScript: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Python: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Java: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'C++': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  'C#': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  Go: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  Rust: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  Ruby: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  PHP: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  Swift: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  Kotlin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  HTML: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  CSS: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

export function LanguageBadge({ language, count, percentage, className }: LanguageBadgeProps) {
  const colorClass = languageColors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';

  return (
    <div className={cn('flex items-center justify-between p-3 rounded-lg border', className)}>
      <div className="flex items-center gap-3">
        <div className={cn('w-3 h-3 rounded-full', colorClass.replace('bg-', 'bg-').split(' ')[0])} />
        <div>
          <div className="font-medium">{language}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {count} {count === 1 ? 'repo' : 'repos'}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className={cn('h-full', colorClass.split(' ')[0])}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-medium w-10 text-right">
          {percentage}%
        </span>
      </div>
    </div>
  );
}