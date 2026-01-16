'use client';

import { useState } from 'react';

interface UsernameFormProps {
  onRoastGenerated?: (data: any) => void;
  onLoadingChange?: (loading: boolean) => void;
  showRoastDisplay?: boolean;
}

export default function UsernameForm({ 
  onRoastGenerated, 
  onLoadingChange, 
  showRoastDisplay = false 
}: UsernameFormProps) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roastData, setRoastData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    const loadingState = true;
    setIsLoading(loadingState);
    onLoadingChange?.(loadingState);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:3001/roast/${username}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate roast');
      }
      const data = await response.json();
      setRoastData(data);
      onRoastGenerated?.(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
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
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Enter GitHub Username
            </label>
            <div className="flex gap-3">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., octocat, microsoft, torvalds"
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-lg"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !username.trim()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
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
        <div className="p-6 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-2xl animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">❌</span>
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">Error</h3>
          </div>
          <p className="text-red-700 dark:text-red-400">
            {error}
          </p>
          <button
            onClick={handleClear}
            className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Only show mini roast display if showRoastDisplay is true */}
      {showRoastDisplay && roastData?.roast && (
        <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border border-orange-200 dark:border-gray-700 rounded-xl">
          <p className="text-gray-800 dark:text-gray-200 line-clamp-3">
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