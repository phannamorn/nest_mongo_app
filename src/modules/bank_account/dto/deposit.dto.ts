import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty()
  bankAccountId: string;

  @ApiProperty()
  amount: number;
}
