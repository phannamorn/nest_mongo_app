import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';

export class CreateOwnerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  user_name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty({ enum: ['user', 'admin'] })
  role: Role;
}
