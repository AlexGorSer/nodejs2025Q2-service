import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'artists' })
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @ManyToMany(() => FavoritesEntity, (fav) => fav.artists)
  favorite: FavoritesEntity[];
}
