import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
