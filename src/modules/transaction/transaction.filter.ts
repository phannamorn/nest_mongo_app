import { FilterOptions } from "src/types/filter.option";

export interface TransactionFilter extends FilterOptions{
    bankAccountId?: string,
    startDate?: string;
    endDate?: string;
};