'use client';

import { useState } from 'react';
import { X, Key, ExternalLink, Copy, Check } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (apiKey: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, onSubmit }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const apiKeyRegex = /^AIza[A-Za-z0-9_-]{35}$/;
    if (!apiKeyRegex.test(apiKey.trim())) {
      setError('Invalid API key format. Gemini API keys start with "AIza" and are 39 characters long.');
      return;
    }
    
    setError('');
    onSubmit(apiKey.trim());
  };

  const copyInstructions = () => {
    const instructions = `How to Get Your Gemini API Key:

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Select "Create API key in new project"
5. Copy the API key (starts with "AIza...")
6. Paste it in the GitHub Roast AI app`;

    navigator.clipboard.writeText(instructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Use Your Own API Key
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rate limit exceeded. Use your personal Gemini API key to continue.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Why Section */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
              ⚠️ Why am I seeing this?
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              Our shared API key has reached its rate limit. You can use your own free Gemini API key to continue generating roasts. Your key is stored locally and only used by you.
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                📝 How to get your API key:
              </h3>
              <button
                onClick={copyInstructions}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Steps</span>
                  </>
                )}
              </button>
            </div>

            <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-semibold">
                  1
                </span>
                <div className="flex-1">
                  <p>Go to Google AI Studio:</p>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-1"
                  >
                    https://aistudio.google.com/app/apikey
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-semibold">
                  2
                </span>
                <p className="flex-1">Sign in with your Google account</p>
              </li>

              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
                <p className="flex-1">Click <strong>"Create API Key"</strong> or <strong>"Get API Key"</strong></p>
              </li>

              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-semibold">
                  4
                </span>
                <p className="flex-1">Select <strong>"Create API key in new project"</strong></p>
              </li>

              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-semibold">
                  5
                </span>
                <p className="flex-1">Copy the API key (it starts with "AIza..." and is 39 characters long)</p>
              </li>

              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-semibold">
                  6
                </span>
                <p className="flex-1">Paste it in the field below</p>
              </li>
            </ol>
          </div>

          {/* API Key Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your Gemini API Key:
              </label>
              <input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError('');
                }}
                placeholder="AIza..."
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            {/* Privacy Notice */}
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-xs text-green-800 dark:text-green-300">
                🔒 <strong>Privacy:</strong> Your API key is stored only in your browser's local storage and is never sent to our servers except when making roast requests. Only you can use your key.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!apiKey.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                Use My API Key
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}