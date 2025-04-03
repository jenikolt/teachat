import { CanActivate, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { decode } from '../../../shared/utils/token.decode';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToWs().getClient();
    const { authorization } = request.handshake.headers;

    request.userId = await decode(authorization, this.jwtService);
    return true;
  }
}
