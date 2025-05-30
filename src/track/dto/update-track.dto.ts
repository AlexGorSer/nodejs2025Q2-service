import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}
