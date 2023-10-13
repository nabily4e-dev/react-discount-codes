import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataService } from 'src/data/data.service';

@Injectable()
export class AuthService {
  constructor(
    private dataService: DataService,
    private jwtService: JwtService,
  ) {}

  register(username: string, password: string, brandName: string) {
    return this.dataService.addUser(username, password, brandName);
  }

  async login(username: string, password: string): Promise<any> {
    const user = this.dataService.findUser(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
