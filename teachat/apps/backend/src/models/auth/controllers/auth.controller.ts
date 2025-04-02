import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { TokenDto } from '../dto/token.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiCreatedResponse({ type: TokenDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Wrong password' })
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registration user' })
  @ApiOkResponse({ type: TokenDto })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User with this email already exists',
  })
  async register(@Body() registerUserDto: RegisterDto): Promise<TokenDto> {
    return this.authService.register(registerUserDto);
  }
}
