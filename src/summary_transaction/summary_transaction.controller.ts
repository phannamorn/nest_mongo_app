import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SummaryTransactionService } from './summary_transaction.service';
import { CreateSummaryTransactionDto } from './dto/create-summary_transaction.dto';
import { UpdateSummaryTransactionDto } from './dto/update-summary_transaction.dto';

@Controller('summary-transaction')
@ApiTags('Summary Transaction')
export class SummaryTransactionController {
  constructor(private readonly summaryTransactionService: SummaryTransactionService) {}

  @Post()
  create(@Body() createSummaryTransactionDto: CreateSummaryTransactionDto) {
    return this.summaryTransactionService.create(createSummaryTransactionDto);
  }

  @Get()
  findAll() {
    return this.summaryTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.summaryTransactionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSummaryTransactionDto: UpdateSummaryTransactionDto) {
    return this.summaryTransactionService.update(id, updateSummaryTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.summaryTransactionService.remove(id);
  }
}
