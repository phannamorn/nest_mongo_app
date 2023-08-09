import { ApiProperty } from '@nestjs/swagger';
import { BankAccountType } from 'src/enums/account.type.enum';

export class CreateBankAccountDto {
  @ApiProperty()
  account_number: string;

  @ApiProperty()
  customer_id: number;

  @ApiProperty()
  account_type: BankAccountType;
}
