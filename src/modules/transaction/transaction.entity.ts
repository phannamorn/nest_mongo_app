import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { BankAccount } from '../bank_account/entities/bank_account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank_account_id: number;

  @Column()
  reference_account_id: number;

  @Column()
  transaction_type: TransactionType;

  @Column()
  amount: number;

  @Column()
  transaction_date: Date;

  @OneToOne(() => BankAccount)
  @JoinColumn({name: 'bank_account_id'})
  bankAccount: BankAccount;
}
