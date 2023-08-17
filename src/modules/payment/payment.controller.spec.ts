import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { WaterPaymentDto } from './dto/payment.dto';
import { Transaction } from '../transaction/transaction.schema';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { Session } from '../auth/session.entity';
import { PAYMENT_SERVICE } from './payment.service.interface';

describe('PaymentController', () => {
  let controller: PaymentController;

  const mockPaymentService = {
    waterPayment: jest.fn()
  };

  const mockJwtService = {
    signAsync: jest.fn()
  };

  const mockSessionRepository = {
    save: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: JwtService,
          useValue: mockJwtService
        },
        {
          provide: getRepositoryToken(Session),
          useValue: mockSessionRepository
        },
        {
          provide: PAYMENT_SERVICE,
          useValue: mockPaymentService
        }
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('waterPayment => should create a new role by a given data', async () => {
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

    jest.spyOn(mockPaymentService, 'waterPayment').mockReturnValue(transaction);

    const result = await controller.waterPayment(waterPaymentDto);

    expect(mockPaymentService.waterPayment).toBeCalled();
    expect(mockPaymentService.waterPayment).toBeCalledWith(waterPaymentDto);

    expect(result).toEqual(transaction);
  });
});
