import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMoviesQueryDto {
  @ApiPropertyOptional({ 
    description: 'Page number for pagination',
    minimum: 1,
    default: 1 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;
}

export class SearchMoviesQueryDto extends GetMoviesQueryDto {
  @ApiProperty({ 
    description: 'Search query string',
    example: 'Spider-Man' 
  })
  @IsString()
  query: string;
}

export class GetMoviesByGenreQueryDto extends GetMoviesQueryDto {
  @ApiProperty({ 
    description: 'Genre ID',
    example: 28 
  })
  @Type(() => Number)
  @IsNumber()
  genreId: number;
}

export class MovieResponseDto {
  @ApiProperty({ description: 'Movie ID' })
  id: number;

  @ApiProperty({ description: 'Movie title' })
  title: string;

  @ApiProperty({ description: 'Movie overview/description' })
  overview: string;

  @ApiProperty({ description: 'Poster image path' })
  poster_path: string;

  @ApiProperty({ description: 'Backdrop image path' })
  backdrop_path: string;

  @ApiProperty({ description: 'Release date' })
  release_date: string;

  @ApiProperty({ description: 'Vote average rating' })
  vote_average: number;

  @ApiProperty({ description: 'Vote count' })
  vote_count: number;

  @ApiProperty({ description: 'Genre IDs', type: [Number] })
  genre_ids: number[];

  @ApiProperty({ description: 'Popularity score' })
  popularity: number;

  @ApiProperty({ description: 'Adult content flag' })
  adult: boolean;

  @ApiProperty({ description: 'Has video flag' })
  video: boolean;

  @ApiProperty({ description: 'Original language' })
  original_language: string;

  @ApiProperty({ description: 'Original title' })
  original_title: string;
}

export class PaginatedMovieResponseDto {
  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Movie results', type: [MovieResponseDto] })
  results: MovieResponseDto[];

  @ApiProperty({ description: 'Total pages' })
  total_pages: number;

  @ApiProperty({ description: 'Total results count' })
  total_results: number;
}

export class GenreDto {
  @ApiProperty({ description: 'Genre ID' })
  id: number;

  @ApiProperty({ description: 'Genre name' })
  name: string;
}