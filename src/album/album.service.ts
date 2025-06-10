import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private readonly logger = new Logger(AlbumService.name, { timestamp: true });
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumEntity: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumEntity.create(createAlbumDto);

    this.logger.log('create new album');

    return await this.albumEntity.save(newAlbum);
  }

  async findAll() {
    this.logger.log('return album');

    return await this.albumEntity.find();
  }

  async findOne(id: string) {
    this.logger.log('find album');

    return await this.findById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findById(id);

    const updateAlbum = Object.assign(album, updateAlbumDto);

    this.logger.log('update album');

    return await this.albumEntity.save(updateAlbum);
  }

  async remove(id: string) {
    const album = await this.findById(id);

    await this.albumEntity.remove(album);

    this.logger.log('delete album');

    return;
  }

  private async findById(id: string) {
    const findId = await this.albumEntity.findOne({ where: { id: id } });
    if (!findId)
      throw new HttpException(
        `Album with id: ${id} doest exist`,
        HttpStatus.NOT_FOUND,
      );
    return findId;
  }
}
