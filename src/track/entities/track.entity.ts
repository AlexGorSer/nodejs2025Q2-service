import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'tracks' })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    cascade: ['soft-remove', 'recover'],
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;

  @Column({ nullable: true })
  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    cascade: ['soft-remove', 'recover'],
  })
  @JoinColumn({ name: 'albumId' })
  albumId: string | null;

  @Column()
  duration: number;
}
