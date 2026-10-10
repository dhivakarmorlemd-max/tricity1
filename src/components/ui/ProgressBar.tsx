import React from 'react';

interface ProgressBarProps {
  value: number; // 0 - 100
  size?: 'sm' | 'md' | 'lg';
  color?: 'teal' | 'indigo' | 'emerald' | 'amber' | 'rose';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = 'md',
  color = 'teal',
  showLabel = true
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heightMap = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const colorMap = {
    teal: 'bg-teal-500',
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>Progress</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${heightMap[size]}`}>
        <div
          className={`${colorMap[color]} ${heightMap[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
