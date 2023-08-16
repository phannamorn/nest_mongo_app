import { ApiPropertyOptional } from "@nestjs/swagger";

export class QueryParams {
    @ApiPropertyOptional()
    limit: number;

    @ApiPropertyOptional()
    offset: number;

    @ApiPropertyOptional()
    search: string;
}