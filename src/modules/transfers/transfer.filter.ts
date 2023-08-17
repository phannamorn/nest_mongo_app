import { FilterOptions } from "src/types/filter.option";

export interface TransferFilter extends FilterOptions {
    bankAccountId?: string,
    startDate?: string;
    endDate?: string;
};