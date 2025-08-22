import { Injectable } from '@nestjs/common';
import { TmdbService } from '../../infrastructure/api/tmdb.service';
import { Movie, MovieDetails, MovieResponse, Genre } from '../../domain/entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(private readonly tmdbService: TmdbService) {}

  async getPopularMovies(page?: number): Promise<MovieResponse> {
    const response = await this.tmdbService.getPopularMovies(page);
    return this.transformMovieResponse(response);
  }

  async getTrendingMovies(timeWindow?: 'day' | 'week'): Promise<MovieResponse> {
    const response = await this.tmdbService.getTrendingMovies(timeWindow);
    return this.transformMovieResponse(response);
  }

  async getTopRatedMovies(page?: number): Promise<MovieResponse> {
    const response = await this.tmdbService.getTopRatedMovies(page);
    return this.transformMovieResponse(response);
  }

  async getNowPlayingMovies(page?: number): Promise<MovieResponse> {
    const response = await this.tmdbService.getNowPlayingMovies(page);
    return this.transformMovieResponse(response);
  }

  async getUpcomingMovies(page?: number): Promise<MovieResponse> {
    const response = await this.tmdbService.getUpcomingMovies(page);
    return this.transformMovieResponse(response);
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const movie = await this.tmdbService.getMovieDetails(movieId);
    return this.transformMovieDetails(movie);
  }

  async searchMovies(query: string, page?: number): Promise<MovieResponse> {
    const response = await this.tmdbService.searchMovies(query, page);
    return this.transformMovieResponse(response);
  }

  async getMoviesByGenre(genreId: number, page?: number): Promise<MovieResponse> {
    const response = await this.tmdbService.getMoviesByGenre(genreId, page);
    return this.transformMovieResponse(response);
  }

  async getGenres(): Promise<Genre[]> {
    return this.tmdbService.getGenres();
  }

  async getHomePageData(): Promise<{
    hero: Movie;
    trending: Movie[];
    popular: Movie[];
    topRated: Movie[];
    nowPlaying: Movie[];
  }> {
    const [trending, popular, topRated, nowPlaying] = await Promise.all([
      this.getTrendingMovies(),
      this.getPopularMovies(),
      this.getTopRatedMovies(),
      this.getNowPlayingMovies(),
    ]);

    // Use first trending movie as hero
    const hero = trending.results[0];

    return {
      hero,
      trending: trending.results.slice(0, 20),
      popular: popular.results.slice(0, 20),
      topRated: topRated.results.slice(0, 20),
      nowPlaying: nowPlaying.results.slice(0, 20),
    };
  }

  private transformMovieResponse(response: MovieResponse): MovieResponse {
    return {
      ...response,
      results: response.results.map(movie => this.transformMovie(movie)),
    };
  }

  private transformMovie(movie: Movie): Movie {
    return {
      ...movie,
      poster_path: movie.poster_path ? this.tmdbService.getImageUrl(movie.poster_path) : null,
      backdrop_path: movie.backdrop_path ? this.tmdbService.getImageUrl(movie.backdrop_path, 'w1280') : null,
    };
  }

  private transformMovieDetails(movie: MovieDetails): MovieDetails {
    return {
      ...movie,
      poster_path: movie.poster_path ? this.tmdbService.getImageUrl(movie.poster_path) : null,
      backdrop_path: movie.backdrop_path ? this.tmdbService.getImageUrl(movie.backdrop_path, 'w1280') : null,
      production_companies: movie.production_companies.map(company => ({
        ...company,
        logo_path: company.logo_path ? this.tmdbService.getImageUrl(company.logo_path) : null,
      })),
    };
  }
}