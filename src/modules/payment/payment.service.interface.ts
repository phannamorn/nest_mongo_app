import { Transaction } from '../transaction/transaction.schema';
import { 
    ElectricityPaymentDto, 
    PhoneCardPaymentDto, 
    TaxOnVehiclePaymentDto, 
    TaxRealestatePaymentDto, 
    WaterPaymentDto 
} from './dto/payment.dto';
import { PaymentFilter } from './payment.filter';

export const PAYMENT_SERVICE = 'PAYMENT_SERVICE';

export interface IPaymentService {
    
    waterPayment(waterPaymentDto: WaterPaymentDto): Promise<Transaction>;
    
    electricityPayment(electricityPaymentDto: ElectricityPaymentDto): Promise<Transaction>;
    
    phoneCardPayment(phoneCardPaymentDto: PhoneCardPaymentDto): Promise<Transaction>;
    
    taxOnRealestatePayment(taxRealestatePaymentDto: TaxRealestatePaymentDto): Promise<Transaction>;
    
    taxOnVehiclePayment(taxOnVehiclePaymentDto: TaxOnVehiclePaymentDto): Promise<Transaction>;
    
    findAll(option: PaymentFilter): Promise<Transaction[]>;
}
  