import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CatEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  color: string;

}