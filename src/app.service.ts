import { Injectable } from '@nestjs/common';
import { CatDto } from './modules/cats/cat.dto';
import { Type } from './enums/type.enum';

@Injectable()
export class AppService {
  getHello(): CatDto[] {
    const cats: CatDto[] = [
      {name: 'hello', breed: 'hello', color: 'red', age: 10, type: Type.Abyssinian}
    ];
    return cats;
  }

  getAll(): CatDto[] {
    const cats: CatDto[] = [{name: 'hello', breed: 'hello', color: 'red', age: 10, type: Type.Abyssinian}];
    return cats;
  }
}
