import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './types/login.dto';
import { RegisterDto } from './types/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register account' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.username, dto.password, dto.brandName);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login and retrieve access token' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, wrong username or password',
  })
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto.username, dto.password);
  }
}
