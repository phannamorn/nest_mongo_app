import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { DepositDto } from '../bank_account/dto/deposit.dto';
import { TransferDto } from '../bank_account/dto/transfer.dto';
import { AuthGuard } from '../auth/auth.guard';
import { WithdrawDto } from '../bank_account/dto/withdraw.dto';
import { TransactionFilter } from './transaction.filter';
import { TransactionParams } from './transaction.params';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('transactions')
@ApiTags('Transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  deposit(@Body() depositDto: DepositDto) {
    return this.transactionService.deposit(depositDto);
  }

  @Post('transfer')
  transfer(@Body() transferDto: TransferDto) {
    return this.transactionService.transfer(transferDto);
  }

  @Post('withdraw')
  withdraw(@Body() withdrawDto: WithdrawDto) {
    return this.transactionService.withdraw(withdrawDto);
  }

  @Get()
  findAll(
    @Query() params: TransactionParams
  ) {
    const option: TransactionFilter = {
      limit: params.limit,
      offset: params.offset,
      bankAccountId: params.bankAccountId,
      startDate: params.startDate,
      endDate: params.endDate
    };
    return this.transactionService.findAll(option);
  }

  @Get('summary')
  getSummary() {
    return this.transactionService.findSummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
