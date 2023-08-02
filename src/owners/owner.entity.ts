import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Owner {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

}
