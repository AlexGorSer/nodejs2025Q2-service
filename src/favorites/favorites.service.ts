import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/helpers/enum.helpers';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './entities/favorites.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { plainToInstance } from 'class-transformer';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

@Injectable()
export class FavoritesService {
  private favoriteID = '1';

  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesEntity: Repository<FavoritesEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistEntity: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumEntity: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackEntity: Repository<TrackEntity>,
  ) {
    this.createAfterLaunch();
  }

  async findAll() {
    const test = await this.favoritesEntity.find({
      relations: ['artists', 'tracks', 'albums'],
    });

    return plainToInstance(FavoritesEntity, test[0]);
  }

  async addTrack(id: string) {
    const findId = await this.trackEntity.findOne({ where: { id: id } });

    if (!findId) {
      throw new HttpException(
        `User with id: ${Messages.TRACK_NO_EXIST} doest exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fav = await this.favoritesEntity.findOne({
      where: { id: this.favoriteID },
      relations: ['tracks'],
    });

    fav.tracks.push(findId);
    return await this.favoritesEntity.save(fav);
  }

  async addAlbum(id: string) {
    const findId = await this.albumEntity.findOne({ where: { id: id } });

    if (!findId) {
      throw new HttpException(
        `User with id: ${Messages.ALBUM_NO_EXIST} doest exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fav = await this.favoritesEntity.findOne({
      where: { id: this.favoriteID },
      relations: ['albums'],
    });

    fav.albums.push(findId);
    return await this.favoritesEntity.save(fav);
  }

  async addArtist(id: string) {
    const findId = await this.artistEntity.findOne({ where: { id: id } });

    if (!findId) {
      throw new HttpException(
        `${Messages.ARTIST_NO_EXIST}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fav = await this.favoritesEntity.findOne({
      where: { id: this.favoriteID },
      relations: ['artists'],
    });

    fav.artists.push(findId);
    return await this.favoritesEntity.save(fav);
  }

  async removeTrack(id: string) {
    const findId = await this.favoritesEntity.findOne({
      where: {
        id: this.favoriteID,
      },
      relations: ['tracks'],
    });
    const find = findId.tracks.find((track) => track.id === id);
    if (!find) {
      throw new HttpException(
        `${Messages.TRACK_NO_FAVORITE}`,
        HttpStatus.NOT_FOUND,
      );
    }

    findId.tracks = findId.tracks.filter((track) => track.id !== id);

    await this.favoritesEntity.save(findId);

    return;
  }

  async removeAlbum(id: string) {
    const findId = await this.favoritesEntity.findOne({
      where: {
        id: this.favoriteID,
      },
      relations: ['albums'],
    });
    const find = findId.albums.find((album) => album.id === id);
    if (!find) {
      throw new HttpException(
        `${Messages.ALBUM_NO_FAVORITE}`,
        HttpStatus.NOT_FOUND,
      );
    }

    findId.albums = findId.albums.filter((album) => album.id !== id);

    await this.favoritesEntity.save(findId);

    return;
  }

  async removeArtist(id: string) {
    const findId = await this.favoritesEntity.findOne({
      where: {
        id: this.favoriteID,
      },
      relations: ['artists'],
    });
    const find = findId.artists.find((artist) => artist.id === id);
    if (!find) {
      throw new HttpException(
        `${Messages.ARTIST_NO_FAVORITE}`,
        HttpStatus.NOT_FOUND,
      );
    }

    findId.artists = findId.artists.filter((artist) => artist.id !== id);

    await this.favoritesEntity.save(findId);

    return;
  }

  private async createAfterLaunch() {
    const fav = await this.favoritesEntity.findOne({
      where: { id: this.favoriteID },
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!fav) {
      await this.favoritesEntity.save({
        id: '1',
        artists: [],
        albums: [],
        tracks: [],
      });
    }
    return;
  }
}
