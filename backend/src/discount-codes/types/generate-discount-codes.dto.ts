import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsNumber, Max } from 'class-validator';

export class GenerateDiscountCodesDto {
  @ApiProperty({ default: 2 })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @Max(10)
  amount: number;
}
