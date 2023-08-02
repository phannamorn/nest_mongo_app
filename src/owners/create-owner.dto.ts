import { ApiProperty } from "@nestjs/swagger";

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
}
