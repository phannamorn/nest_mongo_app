import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatDto } from './cat.dto';
import { Cat } from './cat.entity';
import { FilterOptions } from 'src/types/filter.option';
import { FindOption } from 'src/types/find.option';
// import { CatRepository } from './cat.repository';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}
  // constructor(private catsRepository: CatRepository) {}

  async getAll(option: FilterOptions): Promise<CatDto[]> {
    const findOption: FindOption = { 
      skip: Number(option.offset),
      take: Number(option.limit)
    };
    const cats: CatDto[] = await this.catsRepository.find(findOption);
    return cats;
  }

  async getOne(id: number): Promise<CatDto> {
    const cat: CatDto = await this.catsRepository.findOneBy({id});
    return cat;
  }

  async create(catDto: CatDto): Promise<CatDto> {
    const cat: CatDto = await this.catsRepository.save(catDto);
    return cat;
  }

  update(id: number, catDto: CatDto): void {
    this.catsRepository.update({id}, catDto);
  }

  async delete(id: number) {
    await this.catsRepository.delete({id});
  }
}
