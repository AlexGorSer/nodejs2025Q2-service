import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  private readonly salt = +process.env.CRYPT_SALT || 10;

  private readonly jwtSecret = process.env.JWT_SECRET_KEY || 'secret123123';
  private readonly expireTime = process.env.TOKEN_EXPIRE_TIME || '1h';

  private readonly jwtRefreshSecret =
    process.env.JWT_SECRET_REFRESH_KEY || 'secret123123';
  private readonly expireTimeRefresh =
    process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';

  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto) {
    const { login, password } = authDto;

    const salts = await bcrypt.genSalt(this.salt);

    const user = this.userEntity.create({
      login: login,
      password: await bcrypt.hash(password, salts),
    });

    return await this.userEntity.save(user);
  }

  async login(authDto: AuthDto) {
    const { login, password } = authDto;
    const find = await this.findByLogin(login);
    const validPassword = await bcrypt.compare(password, find.password);

    if (!validPassword) {
      throw new HttpException(
        `User doest exist or password wrong`,
        HttpStatus.FORBIDDEN,
      );
    }
    return this.genJWTtokens({ userId: find.id, login });
  }

  async refresh(refreshDto: RefreshDto) {
    const { refreshToken } = refreshDto;

    if (!refreshToken) {
      throw new HttpException(`no token`, HttpStatus.UNAUTHORIZED);
    }

    try {
      const user = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.jwtRefreshSecret,
      });
      return this.genJWTtokens({
        userId: user.userId,
        login: user.login,
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }

  private genJWTtokens(payload: { userId: string; login: string }) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.jwtSecret,
      expiresIn: this.expireTime,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.jwtRefreshSecret,
      expiresIn: this.expireTimeRefresh,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async findByLogin(login: string) {
    const findByLogin = await this.userEntity.findOne({
      where: { login: login },
    });
    if (!findByLogin)
      throw new HttpException(
        `User doest exist or password wrong`,
        HttpStatus.FORBIDDEN,
      );
    return findByLogin;
  }
}
