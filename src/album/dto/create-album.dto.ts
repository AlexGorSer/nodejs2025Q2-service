import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Innuendo', type: 'string' })
  name: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: 'integer' })
  year: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    format: 'uuid',
    nullable: true,
    type: 'string',
  })
  artistId: string | null;
}
