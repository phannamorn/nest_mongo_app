import { ApiProperty } from '@nestjs/swagger';
import { BankAccountType } from 'src/enums/account.type.enum';

export class CreateBankAccountDto {
  @ApiProperty()
  account_number: string;

  @ApiProperty()
  customer_id: number;

  @ApiProperty({
    enum: BankAccountType,
    example: [BankAccountType.CHECKING, BankAccountType.CREDIT, BankAccountType.PAYROLL, BankAccountType.SAVING]
  })
  account_type: BankAccountType;
}
