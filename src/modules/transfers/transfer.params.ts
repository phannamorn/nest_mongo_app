import { ApiPropertyOptional } from "@nestjs/swagger";
import { QueryParams } from "src/types/quer.params";

export class TransferParams extends QueryParams {
    @ApiPropertyOptional()
    bankAccountId: string;

    @ApiPropertyOptional()
    startDate: string;

    @ApiPropertyOptional()
    endDate: string;
}