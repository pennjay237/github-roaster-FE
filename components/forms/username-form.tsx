'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Share2, Twitter, Linkedin, Copy, Mail, MessageSquare, Globe, MapPin, Briefcase, Link as LinkIcon, CheckCircle, Key } from 'lucide-react';
import { ApiKeyModal } from '../ui/api-key-modal';

interface RoastData {
  success: boolean;
  roast: string;
  data?: {
    username: string;
    name?: string;
    bio?: string;
    publicRepos?: number;
    followers?: number;
    following?: number;
    totalStars?: number;
    accountYears?: number;
    mostUsedLanguage?: string;
    activityLevel?: string;
    avatarUrl?: string;
    profileUrl?: string;
    location?: string;
    company?: string;
    email?: string;
    blog?: string;
    [key: string]: any;
  };
  metadata?: {
    generatedAt: string;
    temperature: number;
    model: string;
    disclaimer: string;
    usingUserApiKey?: boolean;
  };
}

interface UsernameFormProps {
  onRoastGenerated?: (data: RoastData | null) => void; 
  onLoadingChange?: (loading: boolean) => void;
  showRoastDisplay?: boolean;
}

export default function UsernameForm({
  onRoastGenerated,
  onLoadingChange,
  showRoastDisplay = false,
}: UsernameFormProps) {
  const [username, setUsername] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roastData, setRoastData] = useState<RoastData | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // ✅ NEW: API Key management
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [userApiKey, setUserApiKey] = useState<string | null>(null);

  // ✅ Load API key from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('gemini_api_key');
      if (savedKey) {
        setUserApiKey(savedKey);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setRoastData(null);
    setShowShareOptions(false);
    onLoadingChange?.(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      // ✅ Prepare headers with user's API key if available
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (userApiKey) {
        headers['x-user-api-key'] = userApiKey;
      }
      
      const response = await fetch(`${apiUrl}/roast/${username}?temperature=${temperature}`, {
        method: 'GET',
        headers,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to generate roast';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error?.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        // ✅ Detect rate limit errors and show API key modal
        if (
          errorMessage.includes('RATE_LIMIT_EXCEEDED') || 
          errorMessage.includes('rate limit') ||
          errorMessage.includes('quota exceeded') ||
          errorMessage.includes('Too many requests') ||
          response.status === 429
        ) {
          setShowApiKeyModal(true);
          throw new Error('🔑 Server API limit reached. Please use your own free Gemini API key to continue generating roasts.');
        }
        
        // ✅ Detect invalid user API key
        if (userApiKey && (
          errorMessage.includes('API key') && 
          (errorMessage.includes('invalid') || errorMessage.includes('expired'))
        )) {
          setShowApiKeyModal(true);
          throw new Error('❌ Your API key is invalid or expired. Please update your API key.');
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      if (data.success === false) {
        throw new Error(data.error || 'Failed to generate roast');
      }
      
      setRoastData(data);
      onRoastGenerated?.(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Roast generation error:', err);
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  // ✅ Handler for saving API key
  const handleSaveApiKey = (apiKey: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', apiKey);
      setUserApiKey(apiKey);
      setShowApiKeyModal(false);
      setError(null);
      
      // Show success message
      const successMessage = '✅ API key saved! You can now generate unlimited roasts.';
      setError(null);
      
      // Optionally show a success toast
      console.log(successMessage);
    }
  };

  // ✅ Handler for removing API key
  const handleRemoveApiKey = () => {
    if (typeof window !== 'undefined') {
      if (confirm('Are you sure you want to remove your API key? You will fall back to the shared server key which has rate limits.')) {
        localStorage.removeItem('gemini_api_key');
        setUserApiKey(null);
      }
    }
  };

  // ✅ Handler for manually opening API key modal
  const handleOpenApiKeyModal = () => {
    setShowApiKeyModal(true);
  };

  const copyToClipboard = async () => {
    if (!roastData?.roast) return;
    
    const textToCopy = `🔥 GitHub Roast of @${roastData.data?.username || username}\n\n${roastData.roast}\n\n— Generated by GitHub Roast AI`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnTwitter = () => {
    if (!roastData?.roast) return;
    
    const tweetText = encodeURIComponent(
      `🔥 Just got roasted by GitHub Roast AI! Check out my roast:\n\n"${roastData.roast.substring(0, 200)}..."\n\n#GitHub #RoastAI #DeveloperHumor`
    );
    const tweetUrl = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    if (!roastData?.roast) return;
    
    const linkedinUrl = encodeURIComponent(window.location.href);
    const linkedinTitle = encodeURIComponent(`GitHub Roast of @${roastData.data?.username || username}`);
    const linkedinSummary = encodeURIComponent(
      `Just got a hilarious AI-generated roast of my GitHub profile! Check out what GitHub Roast AI had to say about my coding habits.`
    );
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${linkedinUrl}&title=${linkedinTitle}&summary=${linkedinSummary}`,
      '_blank'
    );
  };

  const shareOnWhatsApp = () => {
    if (!roastData?.roast) return;
    
    const whatsappText = encodeURIComponent(
      `Check out my GitHub roast! 🔥\n\n${roastData.roast.substring(0, 150)}...\n\nView full roast: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
  };

  const shareByEmail = () => {
    if (!roastData?.roast) return;
    
    const emailSubject = encodeURIComponent(`My GitHub Roast - ${roastData.data?.username || username}`);
    const emailBody = encodeURIComponent(
      `Check out my hilarious GitHub roast!\n\n${roastData.roast}\n\n— Generated by GitHub Roast AI`
    );
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };

  const handleClear = () => {
    setUsername('');
    setTemperature(0.7);
    setRoastData(null);
    setError(null);
    setShowShareOptions(false);
    onRoastGenerated?.(null);
  };

  const UserAvatar = ({ user, className }: { user: any; className?: string }) => {
    if (!user) return null;
    
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-lg">
              <Image
                src={user.avatarUrl || `https://github.com/${user.username}.png`}
                alt={user.username}
                width={96}
                height={96}
                className="object-cover w-full h-full"
                unoptimized={true}
              />
            </div>
            <div className="absolute -bottom-2 -right-2">
              <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                @{user.username}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            {user.name && (
              <h3 className="text-2xl font-bold mb-1">{user.name}</h3>
            )}
            
            {user.bio && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {user.bio}
              </p>
            )}

            {/* Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {user.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.company && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Briefcase className="h-4 w-4" />
                  <span>{user.company}</span>
                </div>
              )}
              
              {user.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
              )}
              
              {user.blog && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LinkIcon className="h-4 w-4" />
                  <span className="truncate">{user.blog}</span>
                </div>
              )}
            </div>

            {/* GitHub Profile Link */}
            <a
              href={user.profileUrl || `https://github.com/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Globe className="h-4 w-4" />
              View GitHub Profile
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto px-4 sm:px-0">
      {/* Input Form */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="e.g pennjay237"
                className="w-full flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-base sm:text-lg"
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading || !username.trim()}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-black to-black disabled:from-gray-500 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Roasting...
                  </span>
                ) : (
                  'Generate Roast '
                )}
              </button>
            </div>
          </div>
        </form>

        {userApiKey && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Using your personal API key 
                </span>
              </div>
              <button
                onClick={handleRemoveApiKey}
                className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline"
              >
                Remove Key
              </button>
            </div>
          </div>
        )}


        {!userApiKey && (
          <div className="mt-4">
            <button
              onClick={handleOpenApiKeyModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-sm font-medium"
            >
              <Key className="h-4 w-4" />
              Use Your Own API Key
            </button>
          </div>
        )}
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

          <p className="text-sm sm:text-base text-red-700 dark:text-red-400 whitespace-pre-line">
            {error}
          </p>

          {/* ✅ Show "Get API Key" button if error is rate limit related */}
          {(error.includes('rate limit') || error.includes('quota') || error.includes('API key')) && (
            <button
              onClick={handleOpenApiKeyModal}
              className="mt-4 w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              Get Free API Key
            </button>
          )}

          <button
            onClick={handleClear}
            className="mt-2 ml-2 w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* User Avatar & Stats */}
      {roastData?.data && (
        <div className="animate-fade-up">
          <UserAvatar user={roastData.data} />
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Public Repos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {roastData.data.publicRepos || 0}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {roastData.data.followers || 0}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Stars</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {roastData.data.totalStars || 0}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Account Age</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {roastData.data.accountYears || 0} yrs
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Full Roast Display */}
      {roastData?.roast && !showRoastDisplay && (
        <div className="animate-scale-in space-y-6">
          <div className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 border-2 border-orange-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 sm:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl sm:text-3xl">🔥</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Roast of @{roastData.data?.username || username}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Generated by {roastData.metadata?.model || 'AI'} • {new Date(roastData.metadata?.generatedAt || Date.now()).toLocaleDateString()}
                  {roastData.metadata?.usingUserApiKey && (
                    <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">• Using your API key ✓</span>
                  )}
                </p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <span className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold rounded-full text-sm">
                  Gemini AI
                </span>
              </div>
            </div>
            
            {/* Roast Content */}
            <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-8 shadow-inner">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed text-sm sm:text-lg">
                  {roastData.roast}
                </p>
              </div>
            </div>
            
            {/* Share Section */}
            <div className="mb-6 pt-6 border-t-2 border-orange-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5" /> Share this roast
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-colors duration-200 text-sm"
                    >
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      {copied ? 'Copied!' : 'Copy Text'}
                    </button>
                    <button
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-black to-black hover:from-black hover:to-black text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
                    >
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      {showShareOptions ? 'Hide Options' : 'Share on Social'}
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleClear}
                  className="mt-2 sm:mt-0 px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-colors duration-200"
                >
                  Roast Another User 🔄
                </button>
              </div>
              
              {/* Share Options Dropdown */}
              {showShareOptions && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 animate-fade-in">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Share on:</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      onClick={shareOnTwitter}
                      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors duration-200 group"
                    >
                      <Twitter className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 mb-2" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</span>
                    </button>
                    
                    <button
                      onClick={shareOnLinkedIn}
                      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors duration-200 group"
                    >
                      <Linkedin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-700 group-hover:text-blue-800 dark:text-blue-500 dark:group-hover:text-blue-400 mb-2" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</span>
                    </button>
                    
                    <button
                      onClick={shareOnWhatsApp}
                      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-colors duration-200 group"
                    >
                      <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 group-hover:text-green-600 dark:text-green-400 dark:group-hover:text-green-300 mb-2" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp</span>
                    </button>
                    
                    <button
                      onClick={shareByEmail}
                      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-colors duration-200 group"
                    >
                      <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 group-hover:text-red-600 dark:text-red-400 dark:group-hover:text-red-300 mb-2" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Email</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer Disclaimer */}
            <div className="pt-6 border-t-2 border-orange-200 dark:border-gray-700">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <strong>Disclaimer:</strong> {roastData.metadata?.disclaimer || 'This roast is AI-generated and intended for entertainment only.'}
              </p>
            </div>
          </div>
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

      {/* ✅ API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSave={handleSaveApiKey}
      />
    </div>
  );
}