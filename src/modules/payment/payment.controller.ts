import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Inject,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { IPaymentService, PAYMENT_SERVICE } from './payment.service.interface';
import { Transaction } from '../transaction/transaction.schema';
import { 
  ElectricityPaymentDto, 
  PhoneCardPaymentDto, 
  TaxOnVehiclePaymentDto, 
  TaxRealestatePaymentDto, 
  WaterPaymentDto
} from './dto/payment.dto';
import { PaymentParams } from './payment.params';
import { PaymentFilter } from './payment.filter';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('payments')
@ApiTags('Payment')
export class PaymentController {
  constructor(
    @Inject(PAYMENT_SERVICE) private readonly paymentService: IPaymentService
  ) {}

  @Post('water-payment')
  waterPayment(@Body() waterPaymentDto: WaterPaymentDto): Promise<Transaction> {
    return this.paymentService.waterPayment(waterPaymentDto);
  }

  @Post('electricity-payment')
  electricityPayment(@Body() electricityPaymentDto: ElectricityPaymentDto): Promise<Transaction> {
    return this.paymentService.electricityPayment(electricityPaymentDto);
  }

  @Post('phone-card-payment')
  phoneCardPayment(@Body() phoneCardPaymentDto: PhoneCardPaymentDto): Promise<Transaction> {
    return this.paymentService.phoneCardPayment(phoneCardPaymentDto);
  }

  @Post('tax-on-realestate-payment')
  taxOnRealestatePayment(taxOnRealestatePaymentDto: TaxRealestatePaymentDto): Promise<Transaction> {
    return this.paymentService.taxOnRealestatePayment(taxOnRealestatePaymentDto);
  }

  @Post('tax-on-vehicle-payment')
  taxOnVehiclePayment(@Body() taxtOnVehicleDto: TaxOnVehiclePaymentDto): Promise<Transaction> {
    return this.paymentService.taxOnVehiclePayment(taxtOnVehicleDto);
  }

  @Get()
  findAll(@Query() params: PaymentParams) {
    const option: PaymentFilter = {
      limit: params.limit,
      offset: params.offset,
      search: params.search,
      type: params.type
    };
    return this.paymentService.findAll(option);
  }

}
