'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, Flame, Thermometer, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TemperatureSlider } from './temperature-slider';
import { roastSchema } from '@/lib/schemas/roast.schema';
import { useRoast } from '@/hooks/use-roast';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils/cn';
import toast from 'react-hot-toast';
import { RoastDisplay } from '@/components/roast/roast-display';

type FormData = {
  username: string;
  temperature: number;
};

export function UsernameForm() {
  const [isValidating, setIsValidating] = useState(false);
  const { 
    mutate: generateRoast, 
    isPending: isLoading, 
    data: roastData, 
    error: roastError,
    reset 
  } = useRoast();
  
  // Add this useEffect to debug the data
  useEffect(() => {
    if (roastData) {
      console.log('🎯 Roast Data Received:', roastData);
      console.log('📊 Roast property:', roastData.roast);
      console.log('📊 Has roast?', !!roastData.roast);
      console.log('📈 Metadata:', roastData.metadata);
      console.log('🐱 GitHub Data:', roastData.data);
      console.log('🔍 Data type:', typeof roastData);
    }
  }, [roastData]);

  // Also add this to check the error
  useEffect(() => {
    if (roastError) {
      console.log('❌ Roast Error:', roastError);
      console.log('❌ Error message:', roastError.message);
      console.log('❌ Error stack:', roastError.stack);
    }
  }, [roastError]);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(roastSchema),
    defaultValues: {
      username: '',
      temperature: 0.7,
    },
    mode: 'onChange',
  });

  const username = watch('username');
  const temperature = watch('temperature');
  const debouncedUsername = useDebounce(username, 500);

  const onSubmit = async (data: FormData) => {
    console.log('📝 Form submitted:', data);
    console.log('🚀 Calling generateRoast mutation...');
    
    // Reset previous state
    reset();
    
    try {
      generateRoast({
        username: data.username.trim(),
        temperature: data.temperature,
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to generate roast. Please try again.');
    }
  };

  // Clear form and reset
  const handleClear = () => {
    console.log('🗑️ Clearing form and resetting...');
    reset();
    setValue('username', '');
    setValue('temperature', 0.7);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Flame className="h-5 w-5 text-orange-500" />
            Generate Your Roast
          </CardTitle>
          <CardDescription>
            Enter any GitHub username to get started
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                GitHub Username
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="username"
                  placeholder="octocat"
                  className={cn(
                    "pl-10 h-11",
                    errors.username && "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isLoading || isValidating}
                  {...register('username')}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
              {username && !errors.username && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  ✓ Valid GitHub username
                </p>
              )}
            </div>

            {/* Temperature Slider */}
            <TemperatureSlider
              value={temperature}
              onChange={(value) => setValue('temperature', value)}
              disabled={isLoading}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !isValid || isValidating}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                  Roasting...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Roast
                </>
              )}
            </Button>

            {roastError && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                  ❌ Error Generating Roast
                </h4>
                <p className="text-sm text-red-600 dark:text-red-300">
                  {roastError.message || 'Please check if backend is running on http://localhost:3001'}
                </p>
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                  Tip: Open browser console (F12) for more details
                </p>
              </div>
            )}

            <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-500" />
                Pro Tips
              </h4>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Try popular developers like "torvalds" or "gaearon"</li>
                <li>• Higher temperature = more creative (and spicy!) roasts</li>
                <li>• All roasts are AI-generated and focus on coding habits only</li>
                <li>• Backend URL: http://localhost:3001</li>
              </ul>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Display Roast Results */}
      {roastData && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Roast Results</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => console.log('Roast Data:', roastData)}
                className="text-sm"
              >
                Debug Data
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClear}
                className="text-sm"
              >
                Clear & Try Another
              </Button>
            </div>
          </div>
          
          {/* Add a fallback check */}
          {roastData.roast ? (
            <RoastDisplay 
              roast={roastData.roast}
              githubData={roastData.data}
              metadata={roastData.metadata}
            />
          ) : (
            <Card className="border-2 border-red-200 dark:border-red-800">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                    No roast content found in response
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The backend returned data, but no roast text was found.
                  </p>
                  <pre className="mt-4 text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-auto max-h-40">
                    {JSON.stringify(roastData, null, 2)}
                  </pre>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => console.log('Full roastData:', roastData)}
                    className="mt-4"
                  >
                    Log Full Data to Console
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}