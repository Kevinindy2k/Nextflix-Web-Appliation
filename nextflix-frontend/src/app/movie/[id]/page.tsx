'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMovieById } from '@/hooks/use-movies';
import { Loading } from '@/components/ui/loading';
import { ErrorState } from '@/components/ui/error';
import { EmptyState } from '@/components/ui/empty';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const { data: movie, isLoading, error, refetch } = useMovieById(movieId);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white">
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen text-white">
        <EmptyState type="generic" title="Movie Not Found" />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white relative overflow-x-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-screen">
        {movie.backdrop_path ? (
          <Image
            src={movie.backdrop_path}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

      {/* Navigation Bar */}
      <nav className="relative z-50 w-full">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
        
        <div className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()} 
              className="text-white text-xl hover:text-gray-300 transition-colors"
            >
              ←
            </button>
            <button 
              onClick={() => router.push('/')}
              className="hover:opacity-80 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="139"
                height="39"
                viewBox="0 0 139 39"
                fill="none"
              >
                <g clip-path="url(#clip0_2303_148)">
                  <path
                    d="M19.1129 35.7153C17.0219 36.0885 14.8942 36.2004 12.6931 36.4983L5.97958 16.5157V37.356C3.88861 37.5796 1.98102 37.8778 0 38.1761V0H5.57629L13.2066 21.6608V0H19.1129V35.7153ZM30.6688 13.9805C32.9434 13.9805 36.4285 13.8686 38.5194 13.8686V19.8335C35.9147 19.8335 32.87 19.8335 30.6688 19.9454V28.8185C34.1173 28.5949 37.5657 28.2963 41.0506 28.1845V33.9255L24.799 35.2306V0H41.0506V5.96502H30.6688V13.9805ZM62.8782 5.96516H56.7886V33.4042C54.8075 33.4042 52.8265 33.4042 50.9192 33.4785V5.96516H44.8295V0H62.8785L62.8782 5.96516ZM72.4163 13.5705H80.4505V19.5354H72.4163V33.0687H66.6563V0H83.0551V5.96502H72.4163V13.5705ZM92.5931 27.8491C95.9316 27.9235 99.3064 28.1849 102.572 28.371V34.2615C97.3257 33.9257 92.0796 33.5907 86.7236 33.4785V0H92.5931V27.8491ZM107.524 34.6716C109.395 34.7836 111.376 34.8955 113.284 35.1189V0H107.524V34.6716ZM139 0L131.553 18.1561L139 38.1761C136.799 37.8778 134.598 37.4677 132.396 37.0948L128.178 26.0598L123.886 36.2004C121.758 35.8272 119.704 35.7153 117.576 35.4171L125.133 17.9322L118.31 0H124.619L128.471 10.0287L132.58 0H139V0Z"
                    fill="#E50914"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2303_148">
                    <rect width="139" height="38.1761" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/search')}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Movie Content */}
      <main className="relative z-40 px-4 sm:px-6 md:px-12 pt-20 sm:pt-28 md:pt-32 pb-12 md:pb-24">
        <div className="max-w-4xl">
          {/* Movie Title */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            {movie.original_title !== movie.title && (
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                ({movie.original_title})
              </p>
            )}
          </div>

          {/* Movie Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base text-gray-300">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>•</span>
            <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
            <span>•</span>
            <span>{movie.vote_count.toLocaleString()} votes</span>
            <span>•</span>
            <span className="px-2 py-1 border border-gray-500 text-xs">
              {movie.adult ? '18+' : 'PG'}
            </span>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
              {movie.overview}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
            <button className="bg-white text-black px-8 md:px-12 py-4 md:py-5 rounded flex items-center justify-center space-x-3 font-semibold text-lg hover:bg-gray-200 transition-colors">
              <span className="text-xl md:text-2xl">▶</span>
              <span>Play</span>
            </button>
            <button className="bg-gray-600/70 text-white px-8 md:px-12 py-4 md:py-5 rounded flex items-center justify-center space-x-3 font-semibold text-lg hover:bg-gray-600 transition-colors">
              <span className="text-xl">+</span>
              <span>My List</span>
            </button>
            <button className="bg-gray-600/70 text-white px-8 md:px-12 py-4 md:py-5 rounded flex items-center justify-center space-x-3 font-semibold text-lg hover:bg-gray-600 transition-colors">
              <span className="text-xl">👍</span>
              <span>Like</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
              <div className="space-y-3 text-gray-300">
                <div>
                  <span className="text-white font-medium">Release Date: </span>
                  {new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div>
                  <span className="text-white font-medium">Language: </span>
                  {movie.original_language.toUpperCase()}
                </div>
                <div>
                  <span className="text-white font-medium">Popularity: </span>
                  {movie.popularity.toFixed(0)}
                </div>
              </div>
            </div>
            
            {movie.poster_path && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Poster</h3>
                <div className="w-48 h-72 relative rounded-lg overflow-hidden">
                  <Image
                    src={movie.poster_path}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}