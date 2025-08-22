import { Movie, MovieDetails, MovieResponse, Genre } from '../entities/movie.entity';

export interface IMovieRepository {
  getPopularMovies(page?: number): Promise<MovieResponse>;
  getTrendingMovies(timeWindow?: 'day' | 'week'): Promise<MovieResponse>;
  getTopRatedMovies(page?: number): Promise<MovieResponse>;
  getNowPlayingMovies(page?: number): Promise<MovieResponse>;
  getUpcomingMovies(page?: number): Promise<MovieResponse>;
  getMovieDetails(movieId: number): Promise<MovieDetails>;
  searchMovies(query: string, page?: number): Promise<MovieResponse>;
  getMoviesByGenre(genreId: number, page?: number): Promise<MovieResponse>;
  getGenres(): Promise<Genre[]>;
}