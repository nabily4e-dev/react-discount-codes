const DISCOUNT_CODE_LENGTH = 8;

function generateDiscountCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < DISCOUNT_CODE_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export function generateMultipleDiscountCodes(amount: number): string[] {
  const codes = [];
  for (let i = 0; i < amount; i++) {
    codes.push(generateDiscountCode());
  }
  return codes;
}
