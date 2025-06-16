import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoritesEntity {
  @PrimaryColumn()
  @Exclude()
  id: string;

  @ManyToMany(() => ArtistEntity, (artist) => artist.favorite, {
    cascade: true,
  })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, (album) => album.favorite, {
    cascade: true,
  })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, (track) => track.favorite, {
    cascade: true,
  })
  @JoinTable()
  tracks: TrackEntity[];
}
