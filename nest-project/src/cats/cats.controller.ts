import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pip';
import { SuccessInterceptor } from 'src/common/interceptors/success.intercept';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) //공통으로 filter를 거는 방법
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  //   @UseFilters(HttpExceptionFilter) //개별적으로 filter를 거는 방법
  getAllCat() {
    // throw new HttpException('api error', 401);
    return { cats: 'all cat' };
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    console.log('id:::', id);
    console.log('typeof id:::', typeof id);
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
