'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md animate-fade-up">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-full mb-6">
          <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {error.message || 'An unexpected error occurred while preparing your roast.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            Try again
          </Button>
          <Link href="/" passHref>
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}