import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty()
  bank_account_id: number;

  @ApiProperty()
  reference_account_id: number;

  @ApiProperty()
  amount: number;
}
