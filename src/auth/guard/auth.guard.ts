import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

const whitelistRouts = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/doc',
  '/auth/refresh',
];

@Injectable()
export class AuthJwtGuard implements CanActivate {
  private readonly jwtSecret = process.env.JWT_SECRET_KEY || 'secret123123';

  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (whitelistRouts.includes(req.path)) {
      return true;
    }

    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }

      await this.jwtService.verifyAsync(token, { secret: this.jwtSecret });

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: error.message,
      });
    }
  }
}
