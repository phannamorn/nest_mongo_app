import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './cat.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Role } from 'src/enums/role.enum';
import { FilterOptions } from 'src/types/filter.option';
import { ROLES_KEY } from 'src/enums/role_key.enum';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@ApiBearerAuth()
@UseGuards(AuthGuard)
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
  getAll(
    @Query('search') search?: string,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<CatDto[]> {
    const option: FilterOptions = { search, offset, limit };
    return this.catService.getAll(option);
  }

  @Get(':id')
  @Roles(Role.Admin)
  getOne(@Param('id') id: number): Promise<CatDto> {
    return this.catService.getOne(id);
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
  create(@Body() catDto: CatDto): Promise<CatDto> {
    return this.catService.create(catDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Body() catDto: CatDto, @Param('id') id: number): void {
    this.catService.update(id, catDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number): void {
    this.catService.delete(id);
  }
}
