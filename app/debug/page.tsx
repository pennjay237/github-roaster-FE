'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DebugPage() {
  const [username, setUsername] = useState('octocat');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testBackend = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`http://localhost:3001/roast/${username}`);
      const data = await res.json();
      setResponse(data);
      console.log('Backend Response:', data);
    } catch (err: any) {
      setError(err.message);
      console.error('Backend Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testFrontendHook = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Import your hook dynamically
      const { useRoast } = await import('@/hooks/use-roast');
      const { mutateAsync } = useRoast();
      const result = await mutateAsync({ username });
      setResponse(result);
      console.log('Hook Response:', result);
    } catch (err: any) {
      setError(err.message);
      console.error('Hook Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">API Debug Page</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Test Backend Directly</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="GitHub username"
            />
            <Button onClick={testBackend} disabled={loading}>
              {loading ? 'Testing...' : 'Test Backend'}
            </Button>
            <Button onClick={testFrontendHook} disabled={loading} variant="outline">
              {loading ? 'Testing...' : 'Test Hook'}
            </Button>
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded">
              <p className="text-red-700 dark:text-red-300">Error: {error}</p>
            </div>
          )}
          
          {response && (
            <div className="space-y-4">
              <h3 className="font-semibold">Response:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Roast Text:</h4>
                  <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded min-h-[100px]">
                    {response.roast ? (
                      <pre className="whitespace-pre-wrap text-sm">{response.roast}</pre>
                    ) : (
                      <p className="text-red-500">No roast property found!</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Full Response:</h4>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-auto max-h-[200px]">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Has roast property: {response.roast ? '✅ Yes' : '❌ No'}</p>
                <p>Has data property: {response.data ? '✅ Yes' : '❌ No'}</p>
                <p>Has metadata property: {response.metadata ? '✅ Yes' : '❌ No'}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}