'use client';

import { useState } from 'react';
import { Thermometer, Flame, Zap, Fire } from 'lucide-react';
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
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setInternalValue(newValue);
    onChange(newValue);
  };

  const getTemperatureLabel = (temp: number) => {
    if (temp <= 0.5) return 'Mild';
    if (temp <= 1.0) return 'Balanced';
    if (temp <= 1.5) return 'Spicy';
    return 'Inferno';
  };

  const getTemperatureIcon = (temp: number) => {
    if (temp <= 0.5) return Flame;
    if (temp <= 1.0) return Zap;
    if (temp <= 1.5) return Thermometer;
    return Fire;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0.5) return 'text-green-500';
    if (temp <= 1.0) return 'text-yellow-500';
    if (temp <= 1.5) return 'text-orange-500';
    return 'text-red-500';
  };

  const TemperatureIcon = getTemperatureIcon(value);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center gap-2">
          <Thermometer className="h-4 w-4" />
          Roast Intensity
        </label>
        <div className="flex items-center gap-2">
          <TemperatureIcon className={cn('h-4 w-4', getTemperatureColor(value))} />
          <span className={cn('text-sm font-mono font-bold', getTemperatureColor(value))}>
            {getTemperatureLabel(value)} ({value.toFixed(1)})
          </span>
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.1"
          value={internalValue}
          onChange={handleChange}
          disabled={disabled}
          className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:shadow-lg disabled:opacity-50"
        />
        
        {/* Marks */}
        <div className="flex justify-between px-1 mt-1">
          {[0.1, 0.7, 1.3, 2.0].map((mark) => (
            <div
              key={mark}
              className="flex flex-col items-center"
              style={{ marginLeft: `${((mark - 0.1) / 1.9) * 100}%` }}
            >
              <div className="h-2 w-0.5 bg-gray-300 dark:bg-gray-700" />
              <span className="text-xs text-gray-500 mt-1">{mark.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Higher values make the roast more creative and unpredictable
      </p>
    </div>
  );
}