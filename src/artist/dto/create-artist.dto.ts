import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Freddie Mercury', type: 'string' })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  grammy: boolean;
}
