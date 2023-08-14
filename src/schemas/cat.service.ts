import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './cat.schema';
import { CatDto } from './cat.dto';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private readonly model: Model<CatDocument>) {}

  async findAll(): Promise<Cat[]> {
    return await this.model.find().exec();
  }

  async create(catDto: CatDto): Promise<Cat> {
    return await new this.model({
      ...catDto,
      createdAt: new Date(),
    }).save();
  }
}