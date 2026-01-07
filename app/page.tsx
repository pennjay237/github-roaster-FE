'use client';

import { Suspense } from 'react';
import { Flame, Sparkles, Zap, Code2 } from 'lucide-react';
import { UsernameForm } from '@/components/forms/username-form';
import { RoastSkeleton } from '@/components/roast/roast-skeleton';
import { StatsCard } from '@/components/roast/stats-card';
import { RoastDisplay } from '@/components/roast/roast-display';
import { GitHubStats } from '@/components/github/github-stats';
import { RepoList } from '@/components/github/repo-list';
import { UserAvatar } from '@/components/github/user-avatar';
import { useRoast } from '@/hooks/use-roast';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 shadow-lg">
          <Flame className="h-10 w-10 text-white animate-pulse-glow" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          GitHub Roast AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Enter a GitHub username and let AI roast their coding habits with hilarious developer-focused humor!
        </p>
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span>Real-time GitHub data</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Code2 className="h-5 w-5 text-blue-500" />
            <span>Developer humor</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <span>Adjustable intensity</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <UsernameForm />
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              How it works
            </h3>
            <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Enter any GitHub username</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>AI analyzes their coding activity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Generate a hilarious, developer-focused roast</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<RoastSkeleton />}>
            <RoastContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function RoastContent() {
  const { data, isLoading } = useRoast();

  if (isLoading) {
    return <RoastSkeleton />;
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full mb-6">
          <Flame className="h-12 w-12 text-gray-400 dark:text-gray-600" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Ready to Roast?</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Enter a GitHub username above to generate a hilarious, AI-powered roast.
        </p>
      </div>
    );
  }

  return (
    <>
      <RoastDisplay 
        roast={data.roast}
        username={data.githubData.username}
        generatedAt={data.generatedAt}
        temperature={data.temperature}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <UserAvatar user={data.githubData} />
          <StatsCard data={data.githubData} />
        </div>
        <div className="space-y-6">
          <GitHubStats data={data.githubData} />
          <RepoList repos={data.githubData.recentRepos} />
        </div>
      </div>
    </>
  );
}
