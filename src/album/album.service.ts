import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Albums } from 'src/data-base/album-db/albums';
import { Favorites, Tracks } from 'src/data-base';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = Object.assign({ id: crypto.randomUUID() }, createAlbumDto);
    Albums.push(newAlbum);
    console.log('create new album');
    return newAlbum;
  }

  findAll() {
    console.log('return album');
    return Albums;
  }

  findOne(id: string) {
    const album = this.findById(id);
    console.log('find album');
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findById(id);
    const updateAlbum = Object.assign(album, updateAlbumDto);
    console.log('update album');
    return updateAlbum;
  }

  remove(id: string) {
    const album = this.findById(id);
    const track = Tracks.find((track) => track.albumId === album.id);

    const indexArtist = Albums.findIndex((data) => data.id === album.id);

    Albums.splice(indexArtist, 1);

    const favoriteAlbum = Favorites.albums.findIndex(
      (album) => album.id === id,
    );
    Favorites.albums.splice(favoriteAlbum, 1);

    if (track) {
      Object.assign(track, { albumId: null });
    }
    console.log('delete album');
    return;
  }

  private findById(id: string) {
    const findId = Albums.find((artist) => artist.id === id);
    if (!findId)
      throw new HttpException(
        `Album with id: ${id} doest exist`,
        HttpStatus.NOT_FOUND,
      );
    return findId;
  }
}
