import { Transaction } from '../transaction/transaction.schema';
import { 
    ElectricityPaymentDto, 
    PhoneCardPaymentDto, 
    TaxOnVehiclePaymentDto, 
    TaxRealestatePaymentDto, 
    WaterPaymentDto 
} from './dto/payment.dto';

export const PAYMENT_SERVICE = 'PAYMENT_SERVICE';

export abstract class IPaymentService {
    
    abstract waterPayment(waterPaymentDto: WaterPaymentDto): Promise<Transaction>;
    
    abstract electricityPayment(electricityPaymentDto: ElectricityPaymentDto): Promise<Transaction>;
    
    abstract phoneCardPayment(phoneCardPaymentDto: PhoneCardPaymentDto): Promise<Transaction>;
    
    abstract taxOnRealestatePayment(taxRealestatePaymentDto: TaxRealestatePaymentDto): Promise<Transaction>;
    
    abstract taxOnVehiclePayment(taxOnVehiclePaymentDto: TaxOnVehiclePaymentDto): Promise<Transaction>;
}
  