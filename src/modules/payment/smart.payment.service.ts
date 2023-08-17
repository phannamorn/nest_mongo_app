import { PhoneCardDto } from "./dto/phonecard.dto";
import { Payment } from "./payment.topup.factory";
import { PhoneCard } from "./phonecard.interface";
import { PhoneCardSmartService } from "./phonecard.smart.service";

export class PhoneCardPaymentService implements Payment {
    public factoryMethod(): PhoneCard {
        return new PhoneCardSmartService();
    }

    public phoneCardTopUp(phoneCardDto: PhoneCardDto): string {
        throw new Error("Method not implemented.");
    }

}