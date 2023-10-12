import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'john' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ default: '123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
