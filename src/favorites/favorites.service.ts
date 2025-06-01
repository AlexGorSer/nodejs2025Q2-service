import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favorites, Tracks, Artists } from 'src/data-base';
import { Albums } from 'src/data-base/album-db/albums';

@Injectable()
export class FavoritesService {
  findAll() {
    return Favorites;
  }

  addTrack(id: string) {
    const track = this.findById(id, Tracks, 'id');
    Favorites.tracks.push(track);
    return track;
  }
  addAlbum(id: string) {
    const album = this.findById(id, Albums, 'id');
    Favorites.albums.push(album);
    return album;
  }
  addArtist(id: string) {
    const artist = this.findById(id, Artists, 'id');
    Favorites.artists.push(artist);
    return artist;
  }

  removeTrack(id: string) {
    const track = this.findById(id, Favorites.tracks, 'id');
    const index = Favorites.tracks.findIndex((data) => data.id === track.id);

    Favorites.tracks.splice(index, 1);
    return track;
  }

  removeAlbum(id: string) {
    const album = this.findById(id, Favorites.albums, 'id');
    const index = Favorites.albums.findIndex((data) => data.id === album.id);

    Favorites.albums.splice(index, 1);

    return album;
  }

  removeArtist(id: string) {
    const artist = this.findById(id, Favorites.artists, 'id');
    const index = Favorites.artists.findIndex((data) => data.id === artist.id);

    Favorites.artists.splice(index, 1);
    return artist;
  }

  private findById<T>(id: string, arr: T[], key: string) {
    const findId = arr.find((data) => data[key] === id);
    if (!findId)
      throw new HttpException(
        `id: ${id} doest exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return findId;
  }
}
