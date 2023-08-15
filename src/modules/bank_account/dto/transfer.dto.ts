import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty()
  bankAccountId: string;

  @ApiProperty()
  referenceAccountId: string;

  @ApiProperty()
  amount: number;
}
