import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Movie, MovieDetails, MovieResponse, Genre } from '../../domain/entities/movie.entity';
import { IMovieRepository } from '../../domain/interfaces/movie.repository.interface';

@Injectable()
export class TmdbService implements IMovieRepository {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey: string;
  private readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY') || '';
    if (!this.apiKey) {
      throw new Error('TMDB_API_KEY is required. Please set it in your environment variables.');
    }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            api_key: this.apiKey,
            ...params,
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error(`TMDB API Error for ${endpoint}:`, error.response?.data || error.message);
      throw new HttpException(
        'Failed to fetch data from movie database',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>('/movie/popular', { page });
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>(`/trending/movie/${timeWindow}`);
  }

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>('/movie/top_rated', { page });
  }

  async getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>('/movie/now_playing', { page });
  }

  async getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>('/movie/upcoming', { page });
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.makeRequest<MovieDetails>(`/movie/${movieId}`);
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>('/search/movie', { query, page });
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>('/discover/movie', {
      with_genres: genreId,
      page,
    });
  }

  async getGenres(): Promise<Genre[]> {
    const response = await this.makeRequest<{ genres: Genre[] }>('/genre/movie/list');
    return response.genres;
  }

  getImageUrl(path: string, size: string = 'w500'): string | null {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
  }
}