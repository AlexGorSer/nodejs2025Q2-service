import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  grammy: boolean;
}
