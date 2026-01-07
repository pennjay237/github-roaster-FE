import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full mb-6">
          <Search className="h-16 w-16 text-gray-400 dark:text-gray-600" />
        </div>
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" passHref>
            <Button className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="outline" className="gap-2">
              <Search className="h-5 w-5" />
              Find a GitHub User
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}