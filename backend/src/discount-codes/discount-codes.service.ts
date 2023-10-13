import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';

@Injectable()
export class DiscountCodesService {
  constructor(private dataService: DataService) {}

  getDiscountCodes(userId: number) {
    return this.dataService.getDiscountCodes(userId);
  }

  markDiscountCodeAsUsed(userId: number, discountCodeValue: string) {
    return this.dataService.markDiscountCodeAsUsed(userId, discountCodeValue);
  }

  generateDiscountCodes(userId: number, amount: number) {
    return this.dataService.generateDiscountCodes(userId, amount);
  }
}
