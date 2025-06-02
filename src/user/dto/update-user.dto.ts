import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  newPassword: string;
}
