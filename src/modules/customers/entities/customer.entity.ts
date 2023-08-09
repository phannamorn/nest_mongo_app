import { Transaction } from 'src/modules/transaction/transaction.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @OneToMany(() => Transaction, (transactions) => transactions.customer)
  transactions: Transaction[];
}
