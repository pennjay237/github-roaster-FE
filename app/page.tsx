'use client';

import { useState } from 'react';
import UsernameForm from '@/components/forms/username-form';
import { RoastSkeleton } from '@/components/roast/roast-skeleton';
import GithubStats from '@/components/github/github-stats'; // Import the component

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
        {/* Hero Section - Better desktop spacing */}
        <section className="text-center mb-12 animate-fade-in max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-black to-black bg-clip-text text-transparent">
            GitHub Roast AI
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Enter a GitHub username and let Google Gemini AI roast their coding habits with hilarious developer-focused humor!
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full text-sm sm:text-base">
              <span>Powered by Gemini AI</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 rounded-full text-sm sm:text-base">
              <span>Real-time GitHub data</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded-full text-sm sm:text-base">
              <span>Developer humor</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/30 rounded-full text-sm sm:text-base">
              <span>Adjustable creativity</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Form & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Username Form Card - Better desktop height */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 h-fit">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl"></span>
                Enter GitHub Username
              </h3>
              <UsernameForm 
                onRoastGenerated={handleRoastGenerated}
                onLoadingChange={handleLoadingChange}
                showRoastDisplay={false}
              />
            </div>
            
            {/* Info Card - Better desktop positioning */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 h-fit">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                <span className="text-blue-500 text-xl">ℹ️</span> How it works
              </h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                    1
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Enter GitHub username</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Any valid GitHub username</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                    2
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">AI analyzes activity</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Gemini AI reviews coding habits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                    3
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Get hilarious roast</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive developer-focused humor</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column - Results - Better desktop width */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <RoastSkeleton />
            ) : roastData ? (
              <div className="space-y-6">
                {/* Success Message - Better desktop presentation */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Roast Generated Successfully!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your roast for <span className="font-semibold text-blue-600 dark:text-blue-400">@{roastData.data?.username}</span> is ready!
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Model</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {roastData.metadata?.model || 'Gemini AI'}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {roastData.metadata?.temperature || 0.7}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Generated</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(roastData.metadata?.generatedAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* ADDED: GitHub Engagement Stats Component */}
                {roastData.data && roastData.data.createdAt && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="text-blue-500">📈</span> GitHub Engagement Analytics
                    </h4>
                    <GithubStats 
                      data={{
                        createdAt: roastData.data.createdAt || '',
                        updatedAt: roastData.data.updatedAt,
                        lastRepoUpdate: roastData.data.lastRepoUpdate,
                        accountYears: roastData.data.accountYears,
                        publicRepos: roastData.data.publicRepos,
                        followers: roastData.data.followers,
                        totalStars: roastData.data.totalStars,
                        mostUsedLanguage: roastData.data.mostUsedLanguage,
                        mostUsedLanguageCount: roastData.data.mostUsedLanguageCount,
                        mostStarredRepo: roastData.data.mostStarredRepo
                      }}
                    />
                  </div>
                )}
                
                {/* Stats Preview - Added for desktop */}
                {roastData.data && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="text-blue-500">📊</span> Quick Stats
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {roastData.data.publicRepos || 0}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Repos</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {roastData.data.followers || 0}
                        </p>
                        <p className="text-sm text-gray500 dark:text-gray-400">Followers</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {roastData.data.totalStars || 0}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Stars</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {roastData.data.accountYears || 0}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Years</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Empty State - Better desktop presentation */
              <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Ready to Roast?
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                    Enter a GitHub username to generate a hilarious, AI-powered roast using Google Gemini.
                  </p>
                </div>
                
                <div className="inline-flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-black rounded-full shadow-lg">
                    <span className="text-white text-lg font-semibold"> Powered by Gemini AI</span>
                  </div>
                </div>
                
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                  <div className="text-center p-4">
                    <h4 className="font-semibold mb-1">Fast Generation</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get roasts in seconds</p>
                  </div>
                  <div className="text-center p-4">
                    <h4 className="font-semibold mb-1">Accurate Data</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Real GitHub statistics</p>
                  </div>
                  <div className="text-center p-4">
                    <h4 className="font-semibold mb-1">Funny & Clean</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Developer-focused humor</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}