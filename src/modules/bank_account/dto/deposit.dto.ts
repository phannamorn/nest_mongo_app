import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from 'src/enums/transaction.type.enum';

export class DepositDto {
  @ApiProperty()
  bank_account_id: number;

  // @ApiProperty({
  //   enum: TransactionType,
  //   example: [TransactionType.DEPOSIT, TransactionType.WITHDRAW, TransactionType.TRANSFER]
  // })
  // transaction_type: TransactionType;

  @ApiProperty()
  amount: number;
}
