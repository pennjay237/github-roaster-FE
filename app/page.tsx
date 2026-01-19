'use client';

import { useState } from 'react';
import UsernameForm from '@/components/forms/username-form';
import { RoastSkeleton } from '@/components/roast/roast-skeleton';

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

  const handleRoastGenerated = (data: RoastData) => {
    setRoastData(data);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          GitHub Roast AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Enter a GitHub username and let Google Gemini AI roast their coding habits with hilarious developer-focused humor!
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              Powered by Gemini AI
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              Real-time GitHub data
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              Developer humor
          </div>
          <div className="flex items-center gap-2 text-gray:600 dark:text-gray-400">
              Adjustable creativity
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {/* Username Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Enter GitHub Username</h3>
            <UsernameForm 
              onRoastGenerated={handleRoastGenerated}
              onLoadingChange={handleLoadingChange}
              showRoastDisplay={false}
            />
          </div>
          
          {/* Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-blue-500">ℹ️</span> How it works
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
        <div className="lg:col-span-2">
          {isLoading ? (
            <RoastSkeleton />
          ) : roastData ? (
            <div className="space-y-6">
              {/* The UsernameForm already displays the roast, so we don't need extra display here */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-green-500">✅</span> Roast Generated Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your roast for <span className="font-semibold">@{roastData.data?.username}</span> has been generated above. 
                  Scroll up to see the full roast with stats and sharing options!
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              
              <h3 className="text-2xl font-semibold mb-2">Ready to Roast?</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                Enter a GitHub username to generate a hilarious, AI-powered roast using Google Gemini.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-black to-black rounded-full">
                <span className="text-white text-sm"> Powered by Gemini AI</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}