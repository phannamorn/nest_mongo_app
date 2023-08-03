import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from 'src/enums/role.enum';

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
  token: string;

  @Column({enum: ["user", "admin"]})
  role: Role;

  @Column()
  type: Role;

  @Column()
  email: string;

  @Column()
  phone_number: string;

}
