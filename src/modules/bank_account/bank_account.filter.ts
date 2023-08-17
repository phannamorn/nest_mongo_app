import { BankAccountStatus } from "src/enums/bank_account_status.enum";
import { FilterOptions } from "src/types/filter.option";

export interface BankAccountFilter extends FilterOptions {
    status: BankAccountStatus;
}