import { PhoneCardDto } from "./dto/phonecard.dto";

export interface PhoneCard {
    topup(phoneCardDto: PhoneCardDto): boolean;
}