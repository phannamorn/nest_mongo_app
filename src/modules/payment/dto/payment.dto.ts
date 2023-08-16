import { ApiProperty } from "@nestjs/swagger";

export class PaymentDto {
    @ApiProperty()
    bankAccountId: string;

    @ApiProperty()
    amount: number;
}

export class WaterPaymentDto extends PaymentDto{
    @ApiProperty()
    waterBillId: string;
}

export class ElectricityPaymentDto extends PaymentDto {
    @ApiProperty()
    electricityBillId: string;
}

export class PhoneCardPaymentDto extends PaymentDto {
    @ApiProperty()
    phoneCardId: string;
}

export class TaxRealestatePaymentDto extends PaymentDto {
    @ApiProperty()
    realestateId: string;
}

export class TaxOnVehiclePaymentDto extends PaymentDto {
    @ApiProperty()
    vehicleId: string;
}