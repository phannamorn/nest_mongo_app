import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../auth/session.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    MongooseModule.forFeature([{name: Customer.name, schema: CustomerSchema}])
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
