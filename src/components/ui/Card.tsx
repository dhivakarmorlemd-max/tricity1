import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: 'default' | 'glass' | 'glow' | 'obsidian';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  variant = 'default'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'obsidian':
        return 'bg-[#0f0b24]/90 dark:bg-[#0f0b24]/90 border-purple-500/25 shadow-xl shadow-purple-950/40 text-white backdrop-blur-xl';
      case 'glow':
        return 'bg-white/95 dark:bg-[#130e2f]/85 border-purple-500/30 shadow-lg shadow-purple-500/10 dark:shadow-purple-950/40 backdrop-blur-xl';
      case 'glass':
        return 'glass-card-light dark:glass-card-dark';
      case 'default':
      default:
        return 'bg-white/90 dark:bg-[#120d2b]/80 border-slate-200/80 dark:border-purple-500/15 shadow-sm dark:shadow-md dark:shadow-purple-950/30 backdrop-blur-md';
    }
  };

  return (
    <div
      className={`border rounded-2xl p-5 transition-all duration-200 ${getVariantStyles()} ${
        hoverEffect ? 'glow-card-hover cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

