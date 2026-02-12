'use client';

import { useState } from 'react';
import { X, ExternalLink, Key, CheckCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, onSave }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [step, setStep] = useState<'instructions' | 'input'>('instructions');

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim() && apiKey.startsWith('AIza')) {
      onSave(apiKey.trim());
      onClose();
      setApiKey('');
      setStep('instructions');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Key className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Get Your Free Gemini API Key
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'instructions' ? (
            <>
              {/* Why Section */}
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  🚨 Server API Limit Reached
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Our shared API key has hit its rate limit. To continue generating roasts,
                  you'll need to use your own free Gemini API key. Don't worry - it only takes 2 minutes!
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">📝 How to Get Your Free API Key:</h3>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium mb-2">Visit Google AI Studio</p>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Open AI Studio <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium mb-2">Sign in with your Google account</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Use any Gmail account - no credit card required
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium mb-2">Click "Get API Key" or "Create API Key"</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select "Create API key in new project" when prompted
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-medium mb-2">Copy your API key</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      It starts with "AIza..." - copy the entire key
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <p className="font-medium mb-2">Paste it below and start roasting!</p>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                      🔒 Your Key is Safe
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>✅ Stored only in your browser (not on our servers)</li>
                      <li>✅ Only you can use your key</li>
                      <li>✅ Free tier: 1,500 requests per day</li>
                      <li>✅ Delete anytime from settings</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('input')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
              >
                I Have My API Key - Let's Continue →
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep('instructions')}
                className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
              >
                ← Back to instructions
              </button>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Paste Your Gemini API Key
                  </label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIza..."
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Your API key should start with "AIza" and be about 39 characters long
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={!apiKey.trim() || !apiKey.startsWith('AIza')}
                    className="flex-1 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all disabled:cursor-not-allowed"
                  >
                    Save & Start Roasting 🔥
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}