import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateMultipleDiscountCodes } from './utils';
import { User } from './types/user';
import { Code, DiscountCodes } from './types/discount-codes';

@Injectable()
export class DataService {
  private users = [
    {
      userId: 1,
      username: 'john',
      password: '123',
    },
    {
      userId: 2,
      username: 'maria',
      password: '123',
    },
  ];

  private discountCodes = [
    {
      userId: 1,
      brandName: 'StyleMart',
      codes: [
        { value: 'OTDQ2J8N', isUsed: false },
        { value: '762BF3HJ', isUsed: true },
        { value: 'QK16IFNG', isUsed: true },
        { value: '0IJGNU5W', isUsed: false },
        { value: 'PJM6XT9H', isUsed: false },
      ],
    },
    {
      userId: 2,
      brandName: 'Vumera',
      codes: [
        { value: 'C9ELHXU7', isUsed: false },
        { value: 'L6USAG24', isUsed: true },
        { value: 'NI8OH74W', isUsed: true },
        { value: 'UNV825ZL', isUsed: false },
        { value: '3XD20C6Q', isUsed: false },
      ],
    },
  ];

  addUser(username: string, password: string, brandName: string): User {
    if (this.findUser(username)) {
      throw new ConflictException(`${username} is already used registered`);
    }

    const newUserId = Math.max(...this.users.map((user) => user.userId)) + 1;

    const newUser = {
      userId: newUserId,
      username: username,
      password: password,
    };

    this.users = [...this.users, newUser];

    const newDiscountCodes = {
      userId: newUserId,
      brandName: brandName,
      codes: [],
    };

    this.discountCodes = [...this.discountCodes, newDiscountCodes];

    return newUser;
  }

  findUser(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  getDiscountCodes(userId: number): DiscountCodes | undefined {
    return this.discountCodes.find((user) => user.userId === userId);
  }

  generateDiscountCodes(userId: number, amount: number): Code[] {
    const newDiscountCodes = generateMultipleDiscountCodes(amount).map(
      (value) => ({ value: value, isUsed: false }),
    );

    const discountCodes = this.discountCodes.find(
      (user) => user.userId === userId,
    );
    discountCodes.codes = [...discountCodes.codes, ...newDiscountCodes];

    return newDiscountCodes;
  }

  markDiscountCodeAsUsed(userId: number, discountCodeValue: string): Code {
    const code = this.discountCodes
      .find((user) => user.userId === userId)
      .codes?.find((code) => code.value === discountCodeValue);

    if (!code) {
      throw new NotFoundException(`${discountCodeValue} is not found`);
    }

    if (code.isUsed) {
      throw new BadRequestException(`${discountCodeValue} is already used`);
    }

    code.isUsed = true;
    return code;
  }
}
