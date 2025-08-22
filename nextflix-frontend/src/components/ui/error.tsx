import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error loading this content. Please try again.',
  onRetry,
  fullScreen = false,
}) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'
    : 'flex items-center justify-center py-16';

  return (
    <div className={containerClasses}>
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 leading-relaxed">{message}</p>
        </div>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const NetworkError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  return (
    <ErrorState
      title="Connection Problem"
      message="Unable to connect to our servers. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  );
};

export const NotFoundError: React.FC = () => {
  return (
    <ErrorState
      title="Content Not Found"
      message="The content you're looking for doesn't exist or has been removed."
    />
  );
};