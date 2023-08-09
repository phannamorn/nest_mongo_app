import { Singleton } from './util.helper';

describe('Calculate total order product', () => {
  it('Should return the correct total price for a valid product price and quantity', () => {
    const productPrice = 100;
    const quantity = 5;
    const expectedTotalPrice = 500;

    const actualTotalPrice = Singleton.getInstance().getTotalOrder(
      productPrice,
      quantity,
    );

    expect(actualTotalPrice).toBe(expectedTotalPrice);
  });

  it('Should throw an error for an invalid product price', () => {
    const productPrice = -100;
    const quantity = 5;

    try {
      Singleton.getInstance().getTotalOrder(productPrice, quantity);
    } catch (error) {
      expect(error.message).toBe('Invalid product price or quantity.');
    }
  });

  it('Should throw an error for an invalid quantity', () => {
    const productPrice = 100;
    const quantity = -5;

    try {
      Singleton.getInstance().getTotalOrder(productPrice, quantity);
    } catch (error) {
      expect(error.message).toBe('Invalid product price or quantity.');
    }
  });
});

describe('Deposit amount to bank account', () => {
  it('Should return the correct balance after a successful deposit', () => {
    const bankAccount = {
      accountNumber: '1234567890',
      balance: 100,
    };

    const balance = Singleton.getInstance().depositAmountToBankAccount(bankAccount, 50);

    expect(balance).toBe(150);
  });

  it('Should throw an error for an invalid account number', () => {
    const bankAccount = {
      accountNumber: 'Invalid_account_number',
      balance: 100,
    };

    try {
      Singleton.getInstance().depositAmountToBankAccount(bankAccount, 50);
    } catch (error) {
      expect(error.message).toBe('Invalid account number.');
    }
  });

  it('Should throw an error for an invalid amount', () => {
    const bankAccount = {
      accountNumber: '1234567890',
      balance: 100,
    };

    try {
      Singleton.getInstance().depositAmountToBankAccount(bankAccount, -50);
    } catch (error) {
      expect(error.message).toBe('Invalid amount.');
    }
  });

  it('Should return the initial balance if the amount is 0', () => {
    const bankAccount = {
      accountNumber: '1234567890',
      balance: 100,
    };

    try {
      Singleton.getInstance().depositAmountToBankAccount(bankAccount, 0);
    } catch (error) {
      expect(error.message).toBe('Invalid amount.');
    }
  });
});

describe('Create bank account number', () => {
  it('Give last bank account no: 000000000, should return number: 000000001', () => {
    const bankAccountNumber = Singleton.getInstance().createBankAccountNumber('000000000');
    expect(bankAccountNumber).toBe('000000001');
  });

  it('Give last bank account no: 000000001, should return number: 000000002', () => {
    const bankAccountNumber = Singleton.getInstance().createBankAccountNumber('000000001');
    expect(bankAccountNumber).toBe('000000002');
  });
});
