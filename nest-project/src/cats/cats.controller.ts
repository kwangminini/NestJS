import { HttpExceptionFilter } from './../http-exception.filter';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) //공통으로 filter를 거는 방법
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  //   @UseFilters(HttpExceptionFilter) //개별적으로 filter를 거는 방법
  getAllCat() {
    // throw new HttpException('api error', 401);
    return 'all cat';
  }

  @Get(':id')
  getOneCat() {
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete service';
  }
}
