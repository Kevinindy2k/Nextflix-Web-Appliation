'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useSearchMovies } from '@/hooks/use-movies';
import { Loading } from '@/components/ui/loading';
import { ErrorState } from '@/components/ui/error';
import { EmptyState } from '@/components/ui/empty';
import { MovieCard } from '@/components/ui/movie-card';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data: searchResults, isLoading, error, refetch } = useSearchMovies(
    debouncedQuery,
    1,
    debouncedQuery.length > 0
  );

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Update URL with search query
  useEffect(() => {
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
    }
  }, [query, router]);

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
  };

  const handleClearSearch = () => {
    setQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navigation Bar */}
      <nav className="relative z-50 w-full bg-black/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
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
        </div>
      </nav>

      {/* Search Section */}
      <main className="px-4 sm:px-6 md:px-12 pt-8 pb-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-xl">🔍</span>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full pl-12 pr-12 py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg"
            />
            {query && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            )}
          </div>
          
          {query && (
            <p className="mt-2 text-sm text-gray-400">
              Search results for "{query}"
            </p>
          )}
        </div>

        {/* Search Results */}
        <div className="max-w-7xl mx-auto">
          {!debouncedQuery ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Search for Movies</h2>
              <p className="text-gray-400 text-lg">
                Enter a movie title to find what you're looking for
              </p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-20">
              <Loading />
              <p className="mt-4 text-gray-400">Searching...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <ErrorState onRetry={() => refetch()} />
            </div>
          ) : !searchResults?.results.length ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">No Results Found</h2>
              <p className="text-gray-400 text-lg mb-6">
                We couldn't find any movies matching "{debouncedQuery}"
              </p>
              <button
                onClick={handleClearSearch}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Another Search
              </button>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-400">
                  Found {searchResults.total_results.toLocaleString()} results
                  {searchResults.total_pages > 1 && (
                    <span> (Page {searchResults.page} of {searchResults.total_pages})</span>
                  )}
                </p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {searchResults.results.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    size="sm"
                    onClick={() => handleMovieClick(movie.id)}
                  />
                ))}
              </div>

         
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchContent />
    </Suspense>
  );
}