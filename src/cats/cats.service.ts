import { Injectable } from '@nestjs/common';
import { CatDto } from './cat.dto';

@Injectable()
export class CatsService {
    getAll(): CatDto[] {
        return [
            {
              name: "Garfield",
              breed: "Tabby",
              color: "Orange",
            },
            {
              name: "Simba",
              breed: "Lion",
              color: "Yellow",
            },
            {
              name: "Tom",
              breed: "Siamese",
              color: "White",
            },
          ]
    }

    getOne(id: number): CatDto {
        return {
            name: "Garfield",
            breed: "Tabby",
            color: "Orange",
        };
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
