import { BankAccount } from 'src/types/bank.account';

export class Singleton {
  private static instance: Singleton;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  public getTotalOrder(productPrice: number, quantity: number): number {
    if (productPrice <= 0 || quantity <= 0) {
      throw new Error('Invalid product price or quantity.');
    }

    return productPrice * quantity;
  }

  public depositAmountToBankAccount(
    bankAccount: BankAccount,
    amount: number,
  ): number {
    if (amount <= 0) {
      throw new Error('Invalid amount.');
    }

    bankAccount.balance += amount;

    return bankAccount.balance;
  }

  public createBankAccountNumber(lastAccountNo: string): string {
    const NUMBER_OF_DIGIT = 9;

    let nextAccountNo = (Number(lastAccountNo) + 1) .toString();

    return nextAccountNo.padStart(NUMBER_OF_DIGIT, '0');
  }
}
