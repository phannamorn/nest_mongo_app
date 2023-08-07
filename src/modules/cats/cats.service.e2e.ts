import { Injectable } from '@nestjs/common';
import { CatDto } from './cat.dto';
import { FilterOptions } from 'src/types/filter.option';
import { FindOption } from 'src/types/find.option';
import { Type } from 'src/enums/type.enum';

@Injectable()
export class CatsService {
  getAll(option: FilterOptions): CatDto[] {
    const findOption: FindOption = { 
      skip: Number(option.offset),
      take: Number(option.limit)
    };
    const cats: CatDto[] = [{
      name: 'Hello',
      breed: 'Hello',
      color: 'Red',
      age: 10,
      type: Type.Abyssinian
    }]
    return cats;
  }
}
