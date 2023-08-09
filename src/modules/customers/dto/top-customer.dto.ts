import { ApiProperty } from '@nestjs/swagger';

export class TopCustomer {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  total_transaction: number;
}
