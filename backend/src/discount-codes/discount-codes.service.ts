import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';

@Injectable()
export class DiscountCodesService {
  constructor(private dataService: DataService) {}

  async getDiscountCodes(userId: number) {
    return await this.dataService.getDiscountCodes(userId);
  }

  async markDiscountCodeAsUsed(userId: number, discountCodeValue: string) {
    return this.dataService.markDiscountCodeAsUsed(userId, discountCodeValue);
  }

  async generateDiscountCodes(userId: number, amount: number) {
    return this.dataService.generateDiscountCodes(userId, amount);
  }
}
