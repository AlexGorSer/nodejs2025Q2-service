import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artists, Tracks } from 'src/data-base';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const newArtist = Object.assign(
      { id: crypto.randomUUID() },
      createArtistDto,
    );

    Artists.push(newArtist);
    console.log('create new Artist');
    return newArtist;
  }

  findAll() {
    console.log('return all Artist');
    return Artists;
  }

  findOne(id: string) {
    const artist = this.findById(id);
    console.log(`return all ${artist.id}`);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findById(id);
    const updateArtist = Object.assign(artist, updateArtistDto);
    console.log('update Artist');

    return updateArtist;
  }

  remove(id: string) {
    const artist = this.findById(id);
    const track = Tracks.find((track) => track.artistId === artist.id);

    const indexArtist = Artists.findIndex((data) => data.id === artist.id);
    Artists.splice(indexArtist, 1);

    if (track) {
      track.artistId = null;
    }
    console.log('Artist deleted');
    return;
  }

  private findById(id: string) {
    const findId = Artists.find((artist) => artist.id === id);
    if (!findId)
      throw new HttpException(
        `Artist with id: ${id} doest exist`,
        HttpStatus.NOT_FOUND,
      );
    return findId;
  }
}
