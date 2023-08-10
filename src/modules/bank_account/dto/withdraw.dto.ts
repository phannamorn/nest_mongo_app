import { ApiProperty } from '@nestjs/swagger';

export class WithdrawDto {
  @ApiProperty()
  bank_account_id: number;

  @ApiProperty()
  amount: number;
}
