export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 animate-pulse">
          <div className="h-12 w-12 rounded-full bg-white/20 animate-spin" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Preparing the ultimate roast experience
        </p>
      </div>
    </div>
  );
}