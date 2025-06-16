import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  private readonly logger = new Logger(TrackService.name, { timestamp: true });
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackEntity: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const newArtist = this.trackEntity.create(createTrackDto);

    this.logger.log(`create new track`);

    return await this.trackEntity.save(newArtist);
  }

  async findAll() {
    this.logger.log('return all tracks');

    return await this.trackEntity.find();
  }

  async findOne(id: string) {
    const track = await this.findById(id);

    this.logger.log(`find track id: ${track.id}, ${track.name}`);

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findById(id);

    const updatedTrack = Object.assign(track, updateTrackDto);

    this.logger.log(
      `update track id: ${updatedTrack.id}, ${updatedTrack.name}`,
    );

    return updatedTrack;
  }

  async remove(id: string) {
    const findTrack = await this.findById(id);

    await this.trackEntity.remove(findTrack);

    this.logger.log(`delete track id: ${id}`);
    return;
  }

  private async findById(id: string) {
    const findId = await this.trackEntity.findOne({ where: { id: id } });
    if (!findId)
      throw new HttpException(
        `Track with id: ${id} doest exist`,
        HttpStatus.NOT_FOUND,
      );
    return findId;
  }
}
