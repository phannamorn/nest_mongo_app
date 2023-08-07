import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'src/enums/type.enum';

export class CatDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  color: string;

  @ApiProperty({enum: ['Persian', 'Siamese', 'Abyssinian']})
  type: Type;

  @ApiProperty({default: 0, maximum: 20})
  age: number;
}