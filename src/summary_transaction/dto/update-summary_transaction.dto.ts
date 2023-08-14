import { PartialType } from '@nestjs/swagger';
import { CreateSummaryTransactionDto } from './create-summary_transaction.dto';

export class UpdateSummaryTransactionDto extends PartialType(CreateSummaryTransactionDto) {}
