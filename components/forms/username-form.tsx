'use client';

import { useState } from 'react';

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

interface UsernameFormProps {
  onRoastGenerated?: (data: RoastData) => void;
  onLoadingChange?: (loading: boolean) => void;
  showRoastDisplay?: boolean;
}

export default function UsernameForm({
  onRoastGenerated,
  onLoadingChange,
  showRoastDisplay = false,
}: UsernameFormProps) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roastData, setRoastData] = useState<RoastData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    const loadingState = true;
    setIsLoading(loadingState);
    onLoadingChange?.(loadingState);
    setError(null);

    try {
      // Use environment variable for backend URL
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/roast/${username}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate roast');
      }
      
      const data: RoastData = await response.json();
      setRoastData(data);
      onRoastGenerated?.(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
    } finally {
      const loadingState = false;
      setIsLoading(loadingState);
      onLoadingChange?.(loadingState);
    }
  };

  const handleClear = () => {
    setUsername('');
    setRoastData(null);
    setError(null);
    onRoastGenerated?.(null);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4 sm:px-0">
      {/* Input Form */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3"
            >
              Enter GitHub Username
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., penjay237"
                className="w-full flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-base sm:text-lg"
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading || !username.trim()}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-black to-black hover:f disabled:from-gray-400 disabled:to-gray-400 text-white font-bold rounded-xl transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin"></span> Roasting...
                  </span>
                ) : (
                  'Generate Roast '
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 sm:p-6 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-2xl animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl sm:text-2xl">❌</span>
            <h3 className="text-lg sm:text-xl font-bold text-red-800 dark:text-red-300">
              Error
            </h3>
          </div>

          <p className="text-sm sm:text-base text-red-700 dark:text-red-400">
            {error}
          </p>

          <button
            onClick={handleClear}
            className="mt-4 w-full sm:w-auto px-4 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Mini Roast Display */}
      {showRoastDisplay && roastData?.roast && (
        <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border border-orange-200 dark:border-gray-700 rounded-xl">
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 line-clamp-3">
            {roastData.roast}
          </p>

          <button
            onClick={handleClear}
            className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}