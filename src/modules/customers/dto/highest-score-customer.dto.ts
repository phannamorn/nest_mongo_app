import { ApiProperty } from '@nestjs/swagger';

export class HighestScoreCustomer {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  credit_score: number;
}
