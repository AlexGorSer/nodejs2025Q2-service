import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', example: 'The Show Must Go On' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  artistId: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'In seconds' })
  duration: number;
}
