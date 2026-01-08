'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Copy, Check, Share2, AlertTriangle, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShareForm } from '@/components/forms/share-form';
import { cn } from '@/lib/utils/cn';
import { getTemperatureLabel, getTemperatureColor } from '@/lib/constants/validation.constants';
import toast from 'react-hot-toast';

interface RoastDisplayProps {
  roast: string;
  username: string;
  generatedAt: string;
  temperature: number;
  model?: string;
  className?: string;
}

export function RoastDisplay({
  roast,
  username,
  generatedAt,
  temperature,
  model = 'gemini-pro',
  className,
}: RoastDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roast);
      setCopied(true);
      toast.success('Roast copied to clipboard! 📋');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy roast');
    }
  };

  const temperatureLabel = getTemperatureLabel(temperature);
  const temperatureColor = getTemperatureColor(temperature);

  return (
    <>
      <Card className={cn('border-blue-200 dark:border-blue-800 shadow-xl', className)}>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
              Roast of @{username}
              <Badge variant="outline" className="ml-2 border-blue-300 text-blue-700 dark:text-blue-300">
                AI-Generated
              </Badge>
              <Badge className={cn('ml-2', temperatureColor.replace('text-', 'bg-').replace('-500', '-100'), 'dark:bg-opacity-20')}>
                <Zap className="h-3 w-3 mr-1" />
                {temperatureLabel}
              </Badge>
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Brain className="h-4 w-4" />
                <span>{model}</span>
              </div>
              
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
          
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Generated {formatDistanceToNow(new Date(generatedAt), { addSuffix: true })}</span>
            <span>•</span>
            <span>Creativity: {temperature.toFixed(1)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              {model}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Roast Content */}
          <div className={cn(
            "prose prose-lg dark:prose-invert max-w-none",
            "prose-p:leading-relaxed prose-p:mb-4",
            "prose-strong:text-blue-600 dark:prose-strong:text-blue-400",
            "prose-em:text-purple-600 dark:prose-em:text-purple-400",
            "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800",
            "rounded-xl p-6 border border-blue-100 dark:border-blue-900",
            "shadow-inner"
          )}>
            <div className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
              {roast}
            </div>
          </div>

          {/* AI Info */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Powered by Google Gemini AI</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  This roast was generated using {model} with built-in safety filters
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-blue-300">
              Creativity: {temperature.toFixed(1)}
            </Badge>
          </div>

          {/* Disclaimer */}
          <Alert variant="warning">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription>
              <p className="font-medium mb-1">Important Disclaimer</p>
              <p className="text-sm">
                This roast is AI-generated by Google Gemini and intended for entertainment only. 
                All jokes are in good fun and focus on coding habits, not personal attributes. 
                Gemini AI includes built-in safety filters to prevent harmful content.
              </p>
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