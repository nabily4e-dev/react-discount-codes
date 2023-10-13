import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ default: 'nora' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ default: '123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ default: 'NetMarket' })
  @IsNotEmpty()
  @IsString()
  brandName: string;
}
