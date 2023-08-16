import { ApiPropertyOptional } from "@nestjs/swagger";
import { TransactionType } from "src/enums/transaction.type.enum";
import { QueryParams } from "src/types/quer.params";

export class PaymentParams extends QueryParams {
    @ApiPropertyOptional({
        enum: [
            TransactionType.DEPOSIT,
            TransactionType.WITHDRAW,
            TransactionType.TRANSFER,
            TransactionType.TAX_PAYMENT,
            TransactionType.WATER_PAYMENT,
            TransactionType.ELECT_PAYMENT,
            TransactionType.PHONE_CARD_PAYMENT
        ]
    })
    type: TransactionType;
}