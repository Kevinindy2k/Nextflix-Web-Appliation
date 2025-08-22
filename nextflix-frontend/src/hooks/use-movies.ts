import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Movie, MovieDetails, MovieResponse, HomePageData, Genre } from '@/types/movie';

// Homepage data
export const useHomePageData = (): UseQueryResult<HomePageData, Error> => {
  return useQuery({
    queryKey: ['homepage'],
    queryFn: () => apiClient.getHomePageData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Popular movies
export const usePopularMovies = (page: number = 1): UseQueryResult<MovieResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => apiClient.getPopularMovies(page),
  });
};

// Trending movies
export const useTrendingMovies = (
  timeWindow: 'day' | 'week' = 'week'
): UseQueryResult<MovieResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'trending', timeWindow],
    queryFn: () => apiClient.getTrendingMovies(timeWindow),
  });
};

// Top rated movies
export const useTopRatedMovies = (page: number = 1): UseQueryResult<MovieResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'top-rated', page],
    queryFn: () => apiClient.getTopRatedMovies(page),
  });
};

// Now playing movies
export const useNowPlayingMovies = (page: number = 1): UseQueryResult<MovieResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => apiClient.getNowPlayingMovies(page),
  });
};

// Upcoming movies
export const useUpcomingMovies = (page: number = 1): UseQueryResult<MovieResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => apiClient.getUpcomingMovies(page),
  });
};

// Search movies
export const useSearchMovies = (
  query: string,
  page: number = 1,
  enabled: boolean = true
): UseQueryResult<MovieResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => apiClient.searchMovies(query, page),
    enabled: enabled && query.length > 0,
  });
};

// Movie details
export const useMovieDetails = (movieId: number): UseQueryResult<MovieDetails, Error> => {
  return useQuery({
    queryKey: ['movies', 'details', movieId],
    queryFn: () => apiClient.getMovieDetails(movieId),
    enabled: !!movieId,
  });
};

// Movie by ID (alias for useMovieDetails with string ID support)
export const useMovieById = (movieId: string): UseQueryResult<MovieDetails, Error> => {
  const id = parseInt(movieId);
  return useQuery({
    queryKey: ['movies', 'details', id],
    queryFn: () => apiClient.getMovieDetails(id),
    enabled: !!movieId && !isNaN(id),
  });
};

// Genres
export const useGenres = (): UseQueryResult<Genre[], Error> => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => apiClient.getGenres(),
    staleTime: 30 * 60 * 1000, // 30 minutes - genres don't change often
  });
};

// Movies by genre
export const useMoviesByGenre = (
  genreId: number,
  page: number = 1
): UseQueryResult<MovieResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'genre', genreId, page],
    queryFn: () => apiClient.getMoviesByGenre(genreId, page),
    enabled: !!genreId,
  });
};