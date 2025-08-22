import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  fullScreen = false,
  text = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
    : 'flex items-center justify-center py-8';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`${sizeClasses[size]} border-4 border-red-600 border-t-transparent rounded-full animate-spin`} />
        {text && (
          <p className="text-white text-sm animate-pulse">{text}</p>
        )}
      </div>
    </div>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="flex-none w-64 sm:w-80 md:w-96 h-36 sm:h-48 md:h-56 bg-gray-800 rounded animate-pulse">
      <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded" />
    </div>
  );
};

export const SkeletonHero: React.FC = () => {
  return (
    <div className="relative z-40 px-4 sm:px-6 md:px-12 pt-20 sm:pt-28 md:pt-32 pb-12 md:pb-24">
      <div className="max-w-xs sm:max-w-lg md:max-w-2xl">
        {/* N Series Original skeleton */}
        <div className="mb-4 md:mb-6 h-12 md:h-16 w-48 md:w-64 bg-gray-700 rounded animate-pulse" />
        
        {/* Show Logo skeleton */}
        <div className="mb-6 md:mb-8 h-32 sm:h-48 md:h-60 w-full bg-gray-700 rounded animate-pulse" />
        
        {/* Top 10 badge skeleton */}
        <div className="flex items-center mb-4 md:mb-6">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-700 rounded mr-2 md:mr-3 animate-pulse" />
          <div className="h-4 md:h-6 w-48 bg-gray-700 rounded animate-pulse" />
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-6 md:mb-8">
          <div className="h-4 md:h-5 w-full bg-gray-700 rounded animate-pulse" />
          <div className="h-4 md:h-5 w-4/5 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 md:h-5 w-3/5 bg-gray-700 rounded animate-pulse" />
        </div>
        
        {/* Action Buttons skeleton */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="h-12 md:h-16 w-full sm:w-32 bg-gray-700 rounded animate-pulse" />
          <div className="h-12 md:h-16 w-full sm:w-40 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};