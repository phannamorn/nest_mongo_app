import { TransactionType } from "src/enums/transaction.type.enum";
import { FilterOptions } from "src/types/filter.option";

export interface PaymentFilter extends FilterOptions {
    type?: TransactionType
};