'use client';

import { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils/cn';

interface GeminiStatusProps {
  className?: string;
}

export function GeminiStatus({ className }: GeminiStatusProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'connected' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const checkGeminiStatus = async () => {
    setStatus('loading');
    setMessage('Checking Gemini AI connection...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/roast'}/gemini/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setStatus('connected');
        setMessage(`Gemini AI connected (${data.model})`);
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to connect to Gemini AI');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect to backend API');
    }
  };

  useEffect(() => {
    // Check status on component mount
    checkGeminiStatus();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'loading':
        return <AlertCircle className="h-4 w-4 text-yellow-500 animate-pulse" />;
      default:
        return <Sparkles className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'error':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      case 'loading':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
      default:
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium', getStatusColor())}>
        {getStatusIcon()}
        <span>{message}</span>
      </div>
      {status === 'error' && (
        <Button
          variant="outline"
          size="sm"
          onClick={checkGeminiStatus}
          className="h-7 text-xs"
        >
          Retry
        </Button>
      )}
    </div>
  );
}