import { ApiProperty } from '@nestjs/swagger';
import { BankAccountType } from 'src/enums/account.type.enum';

export class CreateBankAccountDto {
  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  minTransfer: number;

  @ApiProperty()
  maxTransfer: number;

  @ApiProperty()
  status: string;

  @ApiProperty({
    enum: BankAccountType,
    example: [BankAccountType.CHECKING, BankAccountType.CREDIT, BankAccountType.PAYROLL, BankAccountType.SAVING]
  })
  accountType: BankAccountType;
}
