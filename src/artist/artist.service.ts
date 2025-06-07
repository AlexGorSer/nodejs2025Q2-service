import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  private readonly logger = new Logger(ArtistService.name, { timestamp: true });
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistEntity: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistEntity.create(createArtistDto);

    this.logger.log('create new Artist');

    return await this.artistEntity.save(newArtist);
  }

  async findAll() {
    this.logger.log('return all Artist');

    return await this.artistEntity.find();
  }

  async findOne(id: string) {
    this.logger.log(`return artist`);
    return await this.findById(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findById(id);

    const updateArtist = Object.assign(artist, updateArtistDto);

    this.logger.log('update Artist');

    return await this.artistEntity.save(updateArtist);
  }

  async remove(id: string) {
    const artist = await this.findById(id);

    await this.artistEntity.remove(artist);

    // const tracks = Tracks.filter((track) => track.artistId === artist.id);
    // const albums = Albums.filter((album) => album.artistId === artist.id);

    // const indexArtist = Artists.findIndex((data) => data.id === artist.id);
    // const favoriteArtist = Favorites.artists.findIndex(
    //   (artist) => artist.id === id,
    // );
    // console.log(favoriteArtist);
    // Artists.splice(indexArtist);

    // if (favoriteArtist > 0) {
    //   Favorites.artists.splice(favoriteArtist);
    // }

    // if (tracks.length) {
    //   tracks.forEach((track) => {
    //     Object.assign(track, { artistId: null });
    //   });
    // }
    // if (albums.length) {
    //   albums.forEach((album) => {
    //     Object.assign(album, { artistId: null });
    //   });
    // }
    this.logger.log('Artist deleted');

    return;
  }

  private async findById(id: string) {
    const findId = await this.artistEntity.findOne({ where: { id: id } });
    if (!findId)
      throw new HttpException(
        `Artist with id: ${id} doest exist`,
        HttpStatus.NOT_FOUND,
      );
    return findId;
  }
}
