'use client';

import { useState } from 'react';
import UsernameForm from '@/components/forms/username-form';
import { RoastSkeleton } from '@/components/roast/roast-skeleton';
import GithubStats from '@/components/github/github-stats';

interface RoastData {
  roast: string;
  data?: {
    username: string;
    [key: string]: any;
  };
  metadata?: {
    generatedAt: string;
    temperature: number;
    model: string;
  };
}

export default function HomePage() {
  const [roastData, setRoastData] = useState<RoastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoastGenerated = (data: RoastData | null) => {
    setRoastData(data);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8">

        {/* Hero */}
        <section className="text-center mb-12 max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">GitHub Roast AI</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Enter a GitHub username and let Gemini AI roast their coding habits.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Left Column (ONLY shown before roast exists) */}
          {!roastData && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border">
                <UsernameForm
                  onRoastGenerated={handleRoastGenerated}
                  onLoadingChange={handleLoadingChange}
                  showRoastDisplay={false}
                />
              </div>
            </div>
          )}

          {/* Right Column */}
          <div className={`${roastData ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-6`}>

            {!roastData ? (
              /* Empty State */
              <div className="text-center py-20 border rounded-2xl">
                <h3 className="text-3xl font-bold mb-4">Ready to Roast?</h3>
                <p className="text-gray-500">
                  Enter a GitHub username to begin.
                </p>
              </div>
            ) : (
              <>
                {/* Success Message */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border">
                  <h3 className="text-2xl font-bold mb-2">
                    Roast Generated Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Roast for{' '}
                    <span className="font-semibold text-blue-600">
                      @{roastData.data?.username}
                    </span>
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                      <p className="text-sm text-gray-500">Model</p>
                      <p className="font-semibold">
                        {roastData.metadata?.model || 'Gemini AI'}
                      </p>
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                      <p className="text-sm text-gray-500">Generated</p>
                      <p className="font-semibold">
                        {new Date(
                          roastData.metadata?.generatedAt || Date.now()
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/*  Username Form MOVED HERE */}
                <div className="bg-gradient-to-br from-white to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border">
                  <UsernameForm
                    onRoastGenerated={handleRoastGenerated}
                    onLoadingChange={handleLoadingChange}
                    showRoastDisplay={false}
                  />
                </div>

                {/* Roast Skeleton MOVED HERE */}
                {isLoading && <RoastSkeleton />}

                {/* GitHub Stats (last) */}
                {!isLoading && roastData.data?.createdAt && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="text-blue-500"></span>
                      GitHub Engagement Analytics
                    </h4>

                    <GithubStats
                      data={{
                        createdAt: roastData.data.createdAt,
                        updatedAt: roastData.data.updatedAt,
                        lastRepoUpdate: roastData.data.lastRepoUpdate,
                        accountYears: roastData.data.accountYears,
                        publicRepos: roastData.data.publicRepos,
                        followers: roastData.data.followers,
                        totalStars: roastData.data.totalStars,
                        mostUsedLanguage: roastData.data.mostUsedLanguage,
                        mostUsedLanguageCount:
                          roastData.data.mostUsedLanguageCount,
                        mostStarredRepo: roastData.data.mostStarredRepo,
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border">
            <h3 className="text-lg font-semibold mb-4">ℹ️ How it works</h3>
            <ol className="space-y-3">
              <li>1️⃣ Enter a GitHub username</li>
              <li>2️⃣ AI analyzes activity</li>
              <li>3️⃣ Get hilariously roasted</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
