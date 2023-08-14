import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "src/enums/transaction.type.enum";

export class CreateSummaryTransactionDto {
    @ApiProperty()
    accountNumber: string;

    @ApiProperty()
    referenceAccountNumber: string;

    @ApiProperty()
    type: TransactionType;

    @ApiProperty()
    
    @ApiProperty()
    date: Date;

    @ApiProperty()
    amount: number;
}
