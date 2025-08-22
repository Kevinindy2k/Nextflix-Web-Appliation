import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { MovieService } from '../../application/services/movie.service';
import {
  GetMoviesQueryDto,
  SearchMoviesQueryDto,
  GetMoviesByGenreQueryDto,
  PaginatedMovieResponseDto,
  GenreDto,
} from '../../application/dto/movie.dto';

@ApiTags('movies')
@Controller('api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('homepage')
  @ApiOperation({ summary: 'Get homepage data with hero and movie sections' })
  @ApiResponse({
    status: 200,
    description: 'Homepage data retrieved successfully',
  })
  async getHomePageData() {
    try {
      return await this.movieService.getHomePageData();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch homepage data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular movies' })
  @ApiResponse({
    status: 200,
    description: 'Popular movies retrieved successfully',
    type: PaginatedMovieResponseDto,
  })
  async getPopularMovies(@Query() query: GetMoviesQueryDto) {
    try {
      return await this.movieService.getPopularMovies(query.page);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch popular movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending movies' })
  @ApiQuery({
    name: 'timeWindow',
    required: false,
    enum: ['day', 'week'],
    description: 'Time window for trending movies',
  })
  @ApiResponse({
    status: 200,
    description: 'Trending movies retrieved successfully',
    type: PaginatedMovieResponseDto,
  })
  async getTrendingMovies(@Query('timeWindow') timeWindow?: 'day' | 'week') {
    try {
      return await this.movieService.getTrendingMovies(timeWindow);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch trending movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('top-rated')
  @ApiOperation({ summary: 'Get top rated movies' })
  @ApiResponse({
    status: 200,
    description: 'Top rated movies retrieved successfully',
    type: PaginatedMovieResponseDto,
  })
  async getTopRatedMovies(@Query() query: GetMoviesQueryDto) {
    try {
      return await this.movieService.getTopRatedMovies(query.page);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch top rated movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('now-playing')
  @ApiOperation({ summary: 'Get now playing movies' })
  @ApiResponse({
    status: 200,
    description: 'Now playing movies retrieved successfully',
    type: PaginatedMovieResponseDto,
  })
  async getNowPlayingMovies(@Query() query: GetMoviesQueryDto) {
    try {
      return await this.movieService.getNowPlayingMovies(query.page);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch now playing movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming movies' })
  @ApiResponse({
    status: 200,
    description: 'Upcoming movies retrieved successfully',
    type: PaginatedMovieResponseDto,
  })
  async getUpcomingMovies(@Query() query: GetMoviesQueryDto) {
    try {
      return await this.movieService.getUpcomingMovies(query.page);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch upcoming movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  @ApiOperation({ summary: 'Search movies' })
  @ApiResponse({
    status: 200,
    description: 'Movies search results retrieved successfully',
    type: PaginatedMovieResponseDto,
  })
  async searchMovies(@Query() query: SearchMoviesQueryDto) {
    try {
      return await this.movieService.searchMovies(query.query, query.page);
    } catch (error) {
      throw new HttpException(
        'Failed to search movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('genre/:genreId')
  @ApiOperation({ summary: 'Get movies by genre' })
  @ApiParam({ name: 'genreId', description: 'Genre ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Movies by genre retrieved successfully',
    type: PaginatedMovieResponseDto,
  })
  async getMoviesByGenre(
    @Param('genreId', ParseIntPipe) genreId: number,
    @Query() query: GetMoviesQueryDto,
  ) {
    try {
      return await this.movieService.getMoviesByGenre(genreId, query.page);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movies by genre',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('genres')
  @ApiOperation({ summary: 'Get all movie genres' })
  @ApiResponse({
    status: 200,
    description: 'Movie genres retrieved successfully',
    type: [GenreDto],
  })
  async getGenres() {
    try {
      return await this.movieService.getGenres();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch genres',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie details by ID' })
  @ApiParam({ name: 'id', description: 'Movie ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Movie details retrieved successfully',
  })
  async getMovieDetails(@Param('id', ParseIntPipe) movieId: number) {
    try {
      return await this.movieService.getMovieDetails(movieId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movie details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}