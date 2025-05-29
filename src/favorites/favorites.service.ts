import { Injectable } from '@nestjs/common';
import { CreateFavoritesDto } from './dto/create-favorites.dto';
import { UpdateFavoritesDto } from './dto/update-favorites.dto';

@Injectable()
export class FavoritesService {
  create(createFavoritesDto: CreateFavoritesDto) {
    return 'This action adds a new fav';
  }

  findAll() {
    return `This action returns all favs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fav`;
  }

  update(id: number, updateFavoritesDto: UpdateFavoritesDto) {
    return `This action updates a #${id} fav`;
  }

  remove(id: number) {
    return `This action removes a #${id} fav`;
  }
}
