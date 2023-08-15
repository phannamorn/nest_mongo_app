import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BankAccountService } from './bank_account.service';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';

@Controller('bank_accounts')
@ApiTags('Bank Accounts')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.createBankAccount(createBankAccountDto);
  }

  @Get()
  findAll() {
    return this.bankAccountService.findAll();
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(id);
  }
}
