import { ApiPropertyOptional } from "@nestjs/swagger";
import { BankAccountStatus } from "src/enums/bank_account_status.enum";
import { QueryParams } from "src/types/quer.params";

export class BankAccountParams extends QueryParams {
    @ApiPropertyOptional()
    status: BankAccountStatus;
}