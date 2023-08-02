import { ApiProperty } from '@nestjs/swagger';

export class CatDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  color: string;

  @ApiProperty({enum: ['Persian', 'Siamese', 'Abyssinian']})
  type: string;

  @ApiProperty({default: 0, maximum: 20})
  age: number;

}