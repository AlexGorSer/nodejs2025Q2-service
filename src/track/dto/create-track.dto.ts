import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
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
  @IsInt()
  @ApiProperty()
  duration: number;
}
