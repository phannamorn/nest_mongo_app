import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';

@Injectable()
export class CatRepository extends Repository<Cat> {
  constructor(private dataSource: DataSource) {
    super(Cat, dataSource.createEntityManager());
  }
}
