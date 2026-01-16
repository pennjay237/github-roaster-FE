'use client';

import { useState } from 'react';
import { Flame, Sparkles, Zap, Code2, Brain } from 'lucide-react';
import UsernameForm from '@/components/forms/username-form';
import { RoastSkeleton } from '@/components/roast/roast-skeleton';
import { StatsCard } from '@/components/roast/stats-card';
import { RoastDisplay } from '@/components/roast/roast-display';
import GithubStats from '@/components/github/github-stats';
import { RepoList } from '@/components/github/repo-list';
import { UserAvatar } from '@/components/github/user-avatar';

export default function HomePage() {
  const [roastData, setRoastData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoastGenerated = (data: any) => {
    setRoastData(data);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleClearRoast = () => {
    setRoastData(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-5">
          GitHub Roast AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Enter a GitHub username and let Google Gemini AI roast their coding habits with hilarious developer-focused humor!
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Powered by Gemini AI</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Real-time GitHub data</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Developer humor</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Adjustable creativity</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <UsernameForm 
            onRoastGenerated={handleRoastGenerated}
            onLoadingChange={handleLoadingChange}
            showRoastDisplay={false} 
          />
          
          {/* Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              How it works
            </h3>
            <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Enter any GitHub username</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Gemini AI analyzes their coding activity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Generate a hilarious, developer-focused roast</span>
              </li>
            </ol>
            
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-2 space-y-8">
          {isLoading ? (
            <RoastSkeleton />
          ) : roastData ? (
            <>
              <RoastDisplay 
                roast={roastData.roast}
                username={roastData.data?.username}
                generatedAt={roastData.metadata?.generatedAt}
                temperature={roastData.metadata?.temperature}
                model={roastData.metadata?.model}
                onClear={handleClearRoast}
              />
              
              {roastData.data && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <UserAvatar user={roastData.data} />
                    <StatsCard data={roastData.data} />
                  </div>
                  <div className="space-y-6">
                    <GithubStats data={roastData.data} />
                    <RepoList repos={roastData.data.recentRepos || []} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-2">Ready to Roast?</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Enter a GitHub username to generate a hilarious, AI-powered roast using Google Gemini.
              </p>
              <div className="mt-6 inline-flex items-center gap-2">
                <span className="text-white text-sm">Powered by Gemini AI</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}