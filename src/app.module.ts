import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './typeorm/dataSource';
import { LoggerMiddleware } from './helpers/logger.middleware';
import { LoggerModule } from './helpers/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    LoggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
