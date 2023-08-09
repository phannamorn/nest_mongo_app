import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BankAccountType } from 'src/enums/account.type.enum';
import { Customer } from '../customers/entities/customer.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_Number: string;

  @Column()
  transaction_type: BankAccountType;

  @Column()
  amount: number;

  @Column()
  transaction_date: Date;

  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: Customer;
}
