import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DiscountCodesService } from './discount-codes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { GenerateDiscountCodesDto } from './types/generate-discount-codes.dto';
import { MarkDiscountCodeAsUsedDto } from './types/mark-discount-code-as-used.dto';
import { Code, DiscountCodes } from 'src/data/types/discount-codes';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('discount-codes')
export class DiscountCodesController {
  constructor(private readonly discountCodesService: DiscountCodesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Discount Codes List' })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. Expired access token? Forgot to provide your access token?',
  })
  async getDiscountCodes(@Req() request: Request): Promise<DiscountCodes> {
    const userId = request['user'].sub;
    return this.discountCodesService.getDiscountCodes(userId);
  }

  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Generate Discount Codes' })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. Expired access token? Forgot to provide your access token?',
  })
  async generateDiscountCodes(
    @Req() request: Request,
    @Body() dto: GenerateDiscountCodesDto,
  ): Promise<Code[]> {
    const userId = request['user'].sub;
    const amount = dto.amount;
    return this.discountCodesService.generateDiscountCodes(userId, amount);
  }

  @Post('mark-as-used')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Mark a discount code as used' })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. Expired access token? Forgot to provide your access token?',
  })
  async markDiscountCodeAsUsed(
    @Req() request: Request,
    @Body() dto: MarkDiscountCodeAsUsedDto,
  ): Promise<Code> {
    const userId = request['user'].sub;
    const discountCodeValue = dto.discountCodeValue;
    return this.discountCodesService.markDiscountCodeAsUsed(
      userId,
      discountCodeValue,
    );
  }
}
