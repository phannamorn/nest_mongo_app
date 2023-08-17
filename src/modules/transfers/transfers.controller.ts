import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Query, 
  Inject
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ITransferService } from './transfer.service.interface';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferParams } from './transfer.params';
import { TransferFilter } from './transfer.filter';
import { TRANSFER_SERVICE } from './transfer.service.interface';

@Controller('transfers')
@ApiTags('Transfer')
export class TransfersController {
  constructor(@Inject(TRANSFER_SERVICE) private readonly transfersService: ITransferService) {}

  @Post()
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.transfersService.create(createTransferDto);
  }

  @Get()
  findAll(@Query() params: TransferParams) {
    const option: TransferFilter = {
      bankAccountId: params.bankAccountId,
      startDate: params.startDate,
      endDate: params.endDate
    };
    return this.transfersService.findAll(option);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transfersService.findOne(id);
  }
}
