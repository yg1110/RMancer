import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ERROR_MESSAGE } from './error.constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access-token') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw new UnauthorizedException(ERROR_MESSAGE.UNAUTHORIZED);
    }
    return user;
  }
}
