import { Transaction } from '../transaction/transaction.schema';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferFilter } from './transfer.filter';

export const TRANSFER_SERVICE = 'TRANSFER_SERVICE';

export interface ITransferService {
    create(createTransferDto: CreateTransferDto): Promise<Transaction>;
    findAll(option: TransferFilter): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction>;
}
  