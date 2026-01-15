'use client';

import { useState } from 'react';
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

type FormData = {
  username: string;
  temperature: number;
};

export function UsernameForm() {
  const [isValidating, setIsValidating] = useState(false);
  const { generateRoast, isLoading } = useRoast();
  
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
    try {
      await generateRoast({
        username: data.username.trim(),
        temperature: data.temperature,
      });
    } catch (error) {
      toast.error('Failed to generate roast. Please try again.');
    }
  };

  return (
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

          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Pro Tips
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Try popular developrs like "torvalds" or "gaearon"</li>
              <li>• Higher roast intensity = more creative (and spicy!) roasts</li>
              <li>• All roasts are AI-generated and focus on coding habits only</li>
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}