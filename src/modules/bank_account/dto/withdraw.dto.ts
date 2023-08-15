import { ApiProperty } from '@nestjs/swagger';

export class WithdrawDto {
  @ApiProperty()
  bankAccountId: string;

  @ApiProperty()
  amount: number;
}
