import * as argon2 from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { appDataSource } from '../../../ormconfig';
import { LoginDto } from '../dto/login.dto';
import { TokenDto } from '../dto/token.dto';
import { UserEntity } from '../../../database/entities';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const { password, username } = loginDto;
    const entity: UserEntity | null = await appDataSource
      .getRepository(UserEntity)
      .findOne({
        where: { username },
      });

    if (!entity) {
      throw new ForbiddenException('Wrong login or password');
    }

    const verified = await argon2.verify(entity.password, password);

    if (!verified) {
      throw new ForbiddenException('Wrong login or password');
    }

    return this.getTokens(entity);
  }

  async register(registerUserDto: RegisterDto): Promise<TokenDto> {
    const { username, password } = registerUserDto;
    const passwordHash = await argon2.hash(password);
    const entity: UserEntity | null = await appDataSource
      .getRepository(UserEntity)
      .findOne({
        where: { username },
      });

    if (entity) {
      throw new ForbiddenException('User with this email already exists');
    }

    const { raw } = await appDataSource
      .getRepository(UserEntity)
      .createQueryBuilder()
      .insert()
      .values({
        username,
        password: passwordHash,
      })
      .execute();

    return this.getTokens({ username, ...raw[0] });
  }

  async getTokens(user: UserEntity): Promise<TokenDto> {
    const { id, username } = user;
    const tokenOptions = { username };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(tokenOptions, {
        subject: JSON.stringify({ id, username }),
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(tokenOptions, {
        subject: JSON.stringify({ id, username }),
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
