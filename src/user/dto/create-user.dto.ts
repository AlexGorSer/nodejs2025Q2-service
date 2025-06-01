import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
