import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, CatRepository])],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
