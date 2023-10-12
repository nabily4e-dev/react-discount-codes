import { Module } from '@nestjs/common';
import { DiscountCodesController } from './discount-codes.controller';
import { DiscountCodesService } from './discount-codes.service';
import { DataModule } from 'src/data/data.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DataModule, AuthModule],
  controllers: [DiscountCodesController],
  providers: [DiscountCodesService],
})
export class DiscountCodesModule {}
