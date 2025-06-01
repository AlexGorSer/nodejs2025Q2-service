import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  year: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'string or null', format: 'uuid' })
  artistId: string | null;
}
