import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatDto } from './cat.dto';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) { }

  async getAll(): Promise<CatDto[]> {
    const cats: CatDto[] = await this.catsRepository.find();
    return cats;
  }

  async getOne(id: number): Promise<CatDto> {
    const cat: CatDto = await this.catsRepository.findOneBy({id});
    return cat;
  }

  create(catDto: CatDto): CatDto {
    return catDto;
  }

  update(id: number, catDto: CatDto): CatDto {
    return catDto;
  }

  delete(id: number) {
    return {id: 1, name: "Cat A"};
  }
}
