import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './typeorm/dataSource';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
})
export class AppModule {}
