import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete,
  Body,
  Param, 
  Req, 
  HttpCode
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getAll(@Req() request: Request): CatDto[] {
    return this.catService.getAll();
  }

  @HttpCode(204)
  @Get(':id')
  getOne(@Param('id') id: number): CatDto {
    return this.catService.getOne(id);
  }

  @Post()
  create(@Body() catDto: CatDto): CatDto {
    const cat = this.catService.create(catDto);
    return cat;
  }

  @Put()
  update(id: number, catDto: CatDto): CatDto {
    const cat = this.catService.update(id, catDto);
    return cat;
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.catService.delete(id);
  }
}
