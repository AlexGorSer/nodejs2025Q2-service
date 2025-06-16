import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
}
