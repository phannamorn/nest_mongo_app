import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { DepositDto } from '../bank_account/dto/deposit.dto';
import { TransferDto } from '../bank_account/dto/transfer.dto';
import { AuthGuard } from '../auth/auth.guard';
import { WithdrawDto } from '../bank_account/dto/withdraw.dto';

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
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
