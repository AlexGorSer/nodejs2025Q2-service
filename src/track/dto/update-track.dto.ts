import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  artistId: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty()
  albumId: string | null;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  @ApiProperty()
  duration: number;
}
