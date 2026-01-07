'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Copy, Check, Share2, AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShareForm } from '@/components/forms/share-form';
import { cn } from '@/lib/utils/cn';
import toast from 'react-hot-toast';

interface RoastDisplayProps {
  roast: string;
  username: string;
  generatedAt: string;
  temperature: number;
  className?: string;
}

export function RoastDisplay({
  roast,
  username,
  generatedAt,
  temperature,
  className,
}: RoastDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

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

  const getTemperatureBadge = (temp: number) => {
    if (temp <= 0.5) return { label: 'Mild', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
    if (temp <= 1.0) return { label: 'Balanced', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' };
    if (temp <= 1.5) return { label: 'Spicy', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' };
    return { label: 'Inferno', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' };
  };

  const tempBadge = getTemperatureBadge(temperature);

  return (
    <>
      <Card className={cn('border-orange-200 dark:border-orange-800 shadow-xl', className)}>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="h-2 w-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse" />
              Roast of @{username}
              <Badge variant="outline" className="ml-2 border-orange-300 text-orange-700 dark:text-orange-300">
                AI-Generated
              </Badge>
              <Badge className={cn('ml-2', tempBadge.color)}>
                <Zap className="h-3 w-3 mr-1" />
                {tempBadge.label}
              </Badge>
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShare(!showShare)}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generated {formatDistanceToNow(new Date(generatedAt), { addSuffix: true })}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Roast Content */}
          <div className={cn(
            "prose prose-lg dark:prose-invert max-w-none",
            "prose-p:leading-relaxed prose-p:mb-4",
            "prose-strong:text-orange-600 dark:prose-strong:text-orange-400",
            "prose-em:text-yellow-600 dark:prose-em:text-yellow-400",
            "bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800",
            "rounded-xl p-6 border border-orange-100 dark:border-orange-900",
            "shadow-inner"
          )}>
            <div className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
              {roast}
            </div>
          </div>

          {/* Disclaimer */}
          <Alert variant="warning">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription>
              This roast is AI-generated and intended for entertainment only. All jokes are in good fun and focus on coding habits, not personal attributes. No developers were harmed in the making of this roast. 😄
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Share Form */}
      {showShare && (
        <div className="animate-fade-up">
          <ShareForm roast={roast} username={username} />
        </div>
      )}
    </>
  );
}