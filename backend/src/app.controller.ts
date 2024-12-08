import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMovieDto } from './movie-dto';

@Controller('movies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.appService.create(createMovieDto);
  }

  @Get()
  async getAll() {
    return this.appService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appService.remove(id);
  }
}
