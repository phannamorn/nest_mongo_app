import { PhoneCardDto } from "./dto/phonecard.dto";
import { PhoneCard } from "./phonecard.interface";

export abstract class Payment {
    public abstract factoryMethod(): PhoneCard;

    public phoneCardTopUp(phoneCardDto: PhoneCardDto): string {
        const phoneCard = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${phoneCard.topup(phoneCardDto)}`;
    }
}