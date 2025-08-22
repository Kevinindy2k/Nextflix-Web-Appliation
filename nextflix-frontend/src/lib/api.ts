import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Movie, MovieDetails, MovieResponse, HomePageData, Genre } from '@/types/movie';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any auth headers here if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        // Handle global errors here
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      },
    );
  }

  // Homepage data
  async getHomePageData(): Promise<HomePageData> {
    const response = await this.client.get<HomePageData>('/api/movies/homepage');
    return response.data;
  }

  // Popular movies
  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    const response = await this.client.get<MovieResponse>('/api/movies/popular', {
      params: { page },
    });
    return response.data;
  }

  // Trending movies
  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<MovieResponse> {
    const response = await this.client.get<MovieResponse>('/api/movies/trending', {
      params: { timeWindow },
    });
    return response.data;
  }

  // Top rated movies
  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    const response = await this.client.get<MovieResponse>('/api/movies/top-rated', {
      params: { page },
    });
    return response.data;
  }

  // Now playing movies
  async getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
    const response = await this.client.get<MovieResponse>('/api/movies/now-playing', {
      params: { page },
    });
    return response.data;
  }

  // Upcoming movies
  async getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
    const response = await this.client.get<MovieResponse>('/api/movies/upcoming', {
      params: { page },
    });
    return response.data;
  }

  // Search movies
  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    const response = await this.client.get<MovieResponse>('/api/movies/search', {
      params: { query, page },
    });
    return response.data;
  }

  // Get movie details
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const response = await this.client.get<MovieDetails>(`/api/movies/${movieId}`);
    return response.data;
  }

  // Get genres
  async getGenres(): Promise<Genre[]> {
    const response = await this.client.get<Genre[]>('/api/movies/genres');
    return response.data;
  }

  // Get movies by genre
  async getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieResponse> {
    const response = await this.client.get<MovieResponse>(`/api/movies/genre/${genreId}`, {
      params: { page },
    });
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;