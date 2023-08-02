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
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  @ApiResponse({
    description: 'A list of cats',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              breed: { type: 'string' },
              color: { type: 'string' },
            },
          },
        },
      },
    },
  })
  async getAll(@Req() request: Request): Promise<CatDto[]> {
    return await this.catService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<CatDto> {
    return await this.catService.getOne(id);
  }

  @Post()
  @ApiResponse({
    description: 'Create a new cat',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            breed: { type: 'string' },
            color: { type: 'string' },
          },
        },
      },
    },
  })
  async create(@Body() catDto: CatDto): Promise<CatDto> {
    const cat = await this.catService.create(catDto);
    return cat;
  }

  @Put()
  update(id: number, catDto: CatDto): CatDto {
    const cat = this.catService.update(id, catDto);
    return cat;
  }

  @Delete(':id')
  @HttpCode(201)
  delete(@Param('id') id: number): void {
    this.catService.delete(id);
  }
}
