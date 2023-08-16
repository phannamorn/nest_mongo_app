import {
  Controller,
  Post,
  Body,
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

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('payments')
@ApiTags('Payment')
export class PaymentController {
  constructor(
    @Inject(PAYMENT_SERVICE) private readonly paymentService: IPaymentService
  ) {}

  @Post('water-payment')
  async waterPayment(@Body() waterPaymentDto: WaterPaymentDto): Promise<Transaction> {
    return await this.paymentService.waterPayment(waterPaymentDto);
  }

  @Post('electricity-payment')
  async electricityPayment(@Body() electricityPaymentDto: ElectricityPaymentDto): Promise<Transaction> {
    return await this.paymentService.electricityPayment(electricityPaymentDto);
  }

  @Post('phone-card-payment')
  async phoneCardPayment(@Body() phoneCardPaymentDto: PhoneCardPaymentDto): Promise<Transaction> {
    return await this.paymentService.phoneCardPayment(phoneCardPaymentDto);
  }

  @Post('tax-on-realestate-payment')
  async taxOnRealestatePayment(taxOnRealestatePaymentDto: TaxRealestatePaymentDto): Promise<Transaction> {
    return await this.paymentService.taxOnRealestatePayment(taxOnRealestatePaymentDto);
  }

  @Post('tax-on-vehicle-payment')
  async taxOnVehiclePayment(@Body() taxtOnVehicleDto: TaxOnVehiclePaymentDto): Promise<Transaction> {
    return await this.paymentService.taxOnVehiclePayment(taxtOnVehicleDto);
  }
}
