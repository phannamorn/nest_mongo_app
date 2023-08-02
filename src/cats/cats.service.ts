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

  async create(catDto: CatDto): Promise<CatDto> {
    const cat: CatDto = await this.catsRepository.save(catDto);
    return cat;
  }

  update(id: number, catDto: CatDto): CatDto {
    return catDto;
  }

  async delete(id: number) {
    await this.catsRepository.delete({id});
  }
}
