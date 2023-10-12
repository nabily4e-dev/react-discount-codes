export interface Code {
  value: string;
  isUsed: boolean;
}

export interface DiscountCodes {
  userId: number;
  brandName: string;
  codes: Code[];
}
