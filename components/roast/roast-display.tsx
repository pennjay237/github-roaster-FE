'use client';

import { useState, useEffect } from 'react';
import { Copy, ThumbsUp, ThumbsDown, Share2, Twitter, MessageCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { GitHubStats } from '@/components/github/github-stats';
import { cn } from '@/lib/utils/cn';
import toast from 'react-hot-toast';

interface RoastDisplayProps {
  roast: string;
  githubData?: any;
  metadata?: any;
}

export function RoastDisplay({ roast, githubData, metadata }: RoastDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);
  
  console.log('🎭 RoastDisplay rendered with:', { 
    roastLength: roast?.length, 
    hasGithubData: !!githubData,
    hasMetadata: !!metadata,
    roastPreview: roast?.substring(0, 100) + '...'
  });
  
  // Safe date formatting to prevent "Invalid time value" error
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Just now';
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateString);
        return 'Recently';
      }
      
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
      
      // For dates older than a week, show the date
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error formatting date:', error, dateString);
      return 'Recently';
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roast);
      setCopied(true);
      toast.success('Roast copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy roast');
    }
  };

  const handleShare = (platform: 'twitter' | 'whatsapp' | 'linkedin') => {
    const text = encodeURIComponent(`Check out this AI-generated GitHub roast for ${githubData?.username || 'a developer'}! 🚀\n\n${roast?.substring(0, 200) || ''}...`);
    const url = encodeURIComponent(window.location.href);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
  };

  const handleReaction = (type: 'like' | 'dislike') => {
    setReaction(type);
    toast.success(`Thanks for your ${type}!`);
  };

  // Reset reaction after 5 seconds if set
  useEffect(() => {
    if (reaction) {
      const timer = setTimeout(() => {
        setReaction(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [reaction]);

  // If roast is not a string, show error
  if (typeof roast !== 'string') {
    console.error('❌ RoastDisplay: roast prop is not a string:', roast);
    return (
      <Card className="border-2 border-red-200 dark:border-red-800">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 font-medium mb-2">
              Error: Invalid roast data
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The roast prop is not a string. Type: {typeof roast}
            </p>
            <pre className="mt-4 text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-auto max-h-40">
              {JSON.stringify({ roast, githubData, metadata }, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Roast Card */}
      <Card className="border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span className="text-orange-500">🔥</span>
                GitHub Roast
                <span className="text-orange-500">🔥</span>
              </CardTitle>
              <CardDescription className="mt-2">
                {githubData?.username ? `For @${githubData.username}` : 'AI-generated roast'}
                {metadata?.generatedAt && (
                  <span className="ml-2 text-xs text-gray-500">
                    • {formatDate(metadata.generatedAt)}
                  </span>
                )}
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              {metadata?.model && (
                <Badge variant="outline" className="text-xs">
                  {metadata.model}
                </Badge>
              )}
              {metadata?.temperature && (
                <Badge variant="outline" className="text-xs">
                  Temp: {metadata.temperature}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Roast Content */}
          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {roast || 'No roast text available'}
              </pre>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className={cn(copied && 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800')}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              
              <Button
                variant={reaction === 'like' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleReaction('like')}
                className={cn(reaction === 'like' && 'bg-green-500 hover:bg-green-600')}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like
              </Button>
              
              <Button
                variant={reaction === 'dislike' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleReaction('dislike')}
                className={cn(reaction === 'dislike' && 'bg-red-500 hover:bg-red-600')}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Dislike
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4 mr-2" />
                X
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('whatsapp')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Stats */}
      {githubData && <GitHubStats data={githubData} />}

      {/* Disclaimer */}
      <Card className="border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-300">
              <p className="font-medium mb-1">Disclaimer</p>
              <p>
                {metadata?.disclaimer || 'This roast is AI-generated and intended for entertainment only. All jokes are in good fun and focus on coding habits, not personal attributes.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}