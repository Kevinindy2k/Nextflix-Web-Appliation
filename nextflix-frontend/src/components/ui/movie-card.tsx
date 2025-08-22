import React from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  size?: 'sm' | 'md' | 'lg';
  showHoverActions?: boolean;
  onClick?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  size = 'md',
  showHoverActions = true,
  onClick,
}) => {
  const sizeClasses = {
    sm: 'w-32 h-48 sm:w-36 sm:h-54',
    md: 'w-48 h-28 sm:w-56 sm:h-32 md:w-64 md:h-36 lg:w-72 lg:h-40',
    lg: 'w-56 h-32 sm:w-64 sm:h-36 md:w-72 md:h-40 lg:w-80 lg:h-44',
  };

  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  return (
    <div 
      className={`${sizeClasses[size]} relative rounded group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 flex-shrink-0 overflow-hidden`}
      onClick={handleClick}
    >
      {/* Movie Backdrop/Poster */}
      <div className="relative w-full h-full">
        {movie.backdrop_path || movie.poster_path ? (
          <Image
            src={movie.backdrop_path || movie.poster_path!}
            alt={movie.title}
            fill
            className="object-cover rounded"
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center">
            <div className="text-gray-500 text-center p-4">
              <div className="text-2xl mb-2">🎬</div>
              <div className="text-sm font-medium">{movie.title}</div>
            </div>
          </div>
        )}
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
      </div>

      {/* Netflix Series Badge */}
      {movie.genre_ids.includes(10765) && ( // Sci-Fi & Fantasy genre as Netflix Original indicator
        <div className="absolute top-2 left-2 w-4 h-6 bg-red-600 flex items-center justify-center text-white text-xs font-bold">
          N
        </div>
      )}


      {/* Hover Actions */}
      {showHoverActions && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b">
          <div className="flex items-center justify-between mb-1">
            {/* Action Buttons */}
            <div className="flex items-center space-x-1">
              <button className="w-5 h-5 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Play className="w-2.5 h-2.5 text-black ml-0.5" fill="currentColor" />
              </button>
              <button className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <Plus className="w-2.5 h-2.5 text-white" />
              </button>
              <button className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <ThumbsUp className="w-2.5 h-2.5 text-white" />
              </button>
            </div>
            
            {/* More Info Button */}
            <button className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
              <ChevronDown className="w-2.5 h-2.5 text-white" />
            </button>
          </div>
          
          {/* Movie Info */}
          <div>
            <h4 className="text-white font-semibold text-xs line-clamp-1 mb-1">{movie.title}</h4>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-xs font-semibold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span className="text-gray-400 text-xs">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Simple Title Overlay (when hover actions are disabled) */}
      {!showHoverActions && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h4 className="text-white font-semibold text-sm line-clamp-2">{movie.title}</h4>
        </div>
      )}
    </div>
  );
};