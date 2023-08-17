import { ApiProperty } from "@nestjs/swagger";

export class CreateTransferDto {
    @ApiProperty()
    bankAccountId: string;

    @ApiProperty()
    referenceAccountId: string;

    @ApiProperty()
    amount: number;
}
