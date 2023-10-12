import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './types/login.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login and retrieve access token' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, wrong username or password',
  })
  signIn(@Body() dto: LoginDto) {
    return this.authService.signIn(dto.username, dto.password);
  }
}
