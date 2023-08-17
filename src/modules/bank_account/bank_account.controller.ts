import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BankAccountService } from './bank_account.service';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { BankAccountParams } from './bank_account.params';
import { BankAccountFilter } from './bank_account.filter';

@Controller('bank_accounts')
@ApiTags('Bank Account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.createBankAccount(createBankAccountDto);
  }

  @Get()
  findAll(@Query() params: BankAccountParams) {
    const option: BankAccountFilter = {
      limit: params.limit,
      offset: params.offset,
      search: params.search,
      status: params.status
    };
    return this.bankAccountService.findAll(option);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountService.update(id, updateBankAccountDto);
  }

  @HttpCode(201)
  @Put('block-account/:id')
  blockAccount(@Param('id') id: string) {
    return this.bankAccountService.blockAccount(id);
  }

  @HttpCode(201)
  @Put('unblock-account/:id')
  unBlockAccount(@Param('id') id: string) {
    return this.bankAccountService.unBlockAccount(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(id);
  }
}
