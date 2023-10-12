import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MarkDiscountCodeAsUsedDto {
  @ApiProperty({ default: 'OTDQ2J8N' })
  @IsNotEmpty()
  @IsString()
  discountCodeValue: string;
}
