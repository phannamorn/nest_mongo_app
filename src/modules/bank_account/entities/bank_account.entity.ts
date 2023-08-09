import { BankAccountType } from 'src/enums/account.type.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
