import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from '../application/services/movie.service';
import { TmdbService } from '../infrastructure/api/tmdb.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
    ConfigModule,
  ],
  controllers: [MovieController],
  providers: [MovieService, TmdbService],
  exports: [MovieService],
})
export class MovieModule {}