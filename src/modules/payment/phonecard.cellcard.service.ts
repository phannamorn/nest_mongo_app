import { PhoneCardDto } from "./dto/phonecard.dto";
import { PhoneCard } from "./phonecard.interface";

export class PhoneCardCellCardService implements PhoneCard {
    topup(phoneCardDto: PhoneCardDto): boolean {
        throw new Error("Method not implemented.");
    }
}