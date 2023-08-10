import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { BankAccountType } from 'src/enums/account.type.enum';
import { BankAccountStatus } from 'src/enums/bank_account_status.enum';
import { Customer } from 'src/modules/customers/entities/customer.entity';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_number: string;

  @Column()
  customer_id: number;

  @Column()
  balance: number;

  @Column()
  account_type: BankAccountType;

  @Column()
  min_transfer: number;

  @Column()
  max_transfer: number;

  @Column()
  status: BankAccountStatus;

  @OneToOne(() => Customer)
  @JoinColumn({name: 'customer_id'})
  customer: Customer;
}
