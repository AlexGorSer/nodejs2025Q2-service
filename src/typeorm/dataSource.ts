import { DataSource, DataSourceOptions } from 'typeorm';
import { AlbumEntity } from '../album/entities/album.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { FavoritesEntity } from '../favorites/entities/favorites.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { UserEntity } from '../user/entities/user.entity';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'home-library-data-base',
  port: +process.env.PORT_DATA_BASE | 5432,
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || '12345',
  database: process.env.POSTGRES_DB || 'home-library-db',
  synchronize: false,
  entities: [
    UserEntity,
    TrackEntity,
    AlbumEntity,
    ArtistEntity,
    FavoritesEntity,
  ],
  migrations: ['dist/typeorm/migrations/*.js'],
  migrationsRun: true,
};

const dataSource = new DataSource(config);

export default dataSource;
