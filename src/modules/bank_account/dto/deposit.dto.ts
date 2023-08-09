import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty()
  account_number: string;

  @ApiProperty()
  amount: number;
}
