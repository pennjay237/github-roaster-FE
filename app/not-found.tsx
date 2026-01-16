export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
            <span className="text-6xl">🔍</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <a
            href="/"
            className="inline-block w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            ← Back to Home
          </a>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            If you think this is a mistake, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}