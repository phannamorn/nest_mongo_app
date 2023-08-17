import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { Transaction } from '../transaction/transaction.schema';
import { WaterPaymentDto } from './dto/payment.dto';
import { TransactionType } from 'src/enums/transaction.type.enum';

describe('PaymentService', () => {
  let service: PaymentService;

  const mockTransactionModel = {
    save: jest.fn()
  };

  class MockPaymentModel {
    save() {
      return new Transaction();
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getModelToken(Transaction.name),
          useValue: MockPaymentModel,
        }
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new role and return its data', async () => {
    const waterPaymentDto = {
      bankAccountId: 'Admin',
      waterBillId: '',
      amount: 10
    } as WaterPaymentDto;

    const transaction = {
      bankAccountId: '',
      referenceAccountId: '',
      type: TransactionType.DEPOSIT,
      amount: 10,
      date: new Date()
    } as Transaction;

    jest.spyOn(new MockPaymentModel(), 'save').mockReturnValue(transaction);

    const result = await service.waterPayment(waterPaymentDto);
    expect(new MockPaymentModel().save).toBeCalled();
    expect(new MockPaymentModel().save).toBeCalledWith(waterPaymentDto);

    expect(result).toEqual(transaction);
  });
});
