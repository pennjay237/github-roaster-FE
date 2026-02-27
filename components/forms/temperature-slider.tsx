'use client';

import { cn } from '@/lib/utils/cn';

interface TemperatureSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export function TemperatureSlider({
  value,
  onChange,
  disabled = false,
  className,
}: TemperatureSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  const getTemperatureLabel = (temp: number) => {
    if (temp <= 0.3) return 'Mild';     
    if (temp <= 0.7) return 'Balanced';  
    return 'Creative';
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Creativity Level: {getTemperatureLabel(value)}
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {value.toFixed(1)}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.1"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:shadow-lg disabled:opacity-50"
        />
        
        <div className="flex justify-between px-1 mt-1">
          {[0.0, 0.3, 0.7, 1.0].map((mark) => (
            <div
              key={mark}
              className="flex flex-col items-center"
              style={{ marginLeft: `${((mark - 0.0) / 1.0) * 100}%` }}
            >
              <div className="h-2 w-0.5 bg-gray-300 dark:bg-gray-700" />
              <span className="text-xs text-gray-500 mt-1">{mark.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Higher values make the roast more creative and unpredictable
      </p>
    </div>
  );
}