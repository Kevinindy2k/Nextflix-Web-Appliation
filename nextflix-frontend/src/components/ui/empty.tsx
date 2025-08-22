import React from 'react';
import { Search, Film, TrendingUp } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'movies' | 'generic';
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'generic',
  title,
  message,
  action,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="w-16 h-16 text-gray-500" />;
      case 'movies':
        return <Film className="w-16 h-16 text-gray-500" />;
      default:
        return <TrendingUp className="w-16 h-16 text-gray-500" />;
    }
  };

  const getDefaultContent = () => {
    switch (type) {
      case 'search':
        return {
          title: 'No Results Found',
          message: 'Try adjusting your search terms or browse our popular content instead.',
        };
      case 'movies':
        return {
          title: 'No Movies Available',
          message: 'We couldn\'t find any movies in this category right now.',
        };
      default:
        return {
          title: 'Nothing Here',
          message: 'There\'s no content available at the moment.',
        };
    }
  };

  const defaultContent = getDefaultContent();
  const displayTitle = title || defaultContent.title;
  const displayMessage = message || defaultContent.message;

  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-6">
          {getIcon()}
          <h3 className="text-2xl font-semibold text-white mb-2 mt-4">{displayTitle}</h3>
          <p className="text-gray-400 leading-relaxed">{displayMessage}</p>
        </div>
        
        {action && (
          <button
            onClick={action.onClick}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export const SearchEmpty: React.FC<{ query: string; onClear?: () => void }> = ({ 
  query, 
  onClear 
}) => {
  return (
    <EmptyState
      type="search"
      title={`No results for "${query}"`}
      message="Try searching for something else or browse our popular content."
      action={onClear ? { label: 'Clear Search', onClick: onClear } : undefined}
    />
  );
};