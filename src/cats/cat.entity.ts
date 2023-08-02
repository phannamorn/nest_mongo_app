import { Type } from 'src/enums/type.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  color: string;

  @Column()
  type: Type;

  @Column()
  age: number;

}