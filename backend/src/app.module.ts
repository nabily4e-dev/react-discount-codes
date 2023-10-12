import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DiscountCodesModule } from './discount-codes/discount-codes.module';

@Module({
  imports: [AuthModule, DiscountCodesModule],
})
export class AppModule {}
