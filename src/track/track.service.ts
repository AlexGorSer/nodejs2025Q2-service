import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Favorites, Tracks } from 'src/data-base';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const createTrack = Object.assign(
      { id: crypto.randomUUID(), albumId: null, artistId: null },
      createTrackDto,
    );

    Tracks.push(createTrack);

    console.log(`create new track with id: ${createTrack.id}`);

    return createTrack;
  }

  findAll() {
    console.log('return all tracks');
    return Tracks;
  }

  findOne(id: string) {
    const track = this.findById(id);

    console.log(`find track id: ${track.id}, ${track.name}`);

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findById(id);
    const updatedTrack = Object.assign(track, updateTrackDto);

    console.log(`update track id: ${updatedTrack.id}, ${updatedTrack.name}`);

    return updatedTrack;
  }

  remove(id: string) {
    const findTrack = this.findById(id);
    const index = Tracks.findIndex((tack) => tack.id === findTrack.id);

    const favoriteAlbum = Favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    Favorites.tracks.splice(favoriteAlbum, 1);

    Tracks.splice(index, 1);

    console.log(`delete track id: ${id}`);
    return;
  }

  private findById(id: string) {
    const findId = Tracks.find((track) => track.id === id);
    if (!findId)
      throw new HttpException(
        `Track with id: ${id} doest exist`,
        HttpStatus.NOT_FOUND,
      );
    return findId;
  }
}
