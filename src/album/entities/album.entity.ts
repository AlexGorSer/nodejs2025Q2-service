import { ArtistEntity } from 'src/artist/entities/artist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'albums' })
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    cascade: ['soft-remove', 'recover'],
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;
}
