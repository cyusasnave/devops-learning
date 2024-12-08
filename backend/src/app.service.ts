import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './movie-dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movieExist = await this.findOneByName(createMovieDto.name);
    if (movieExist) throw new ConflictException('Movie already exist!');
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Array<Movie>> {
    return this.movieRepository.find();
  }

  async findOneByName(name: string): Promise<Movie> {
    return this.movieRepository.findOne({ where: { name } });
  }

  async remove(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new NotFoundException('Movie not found!');
    return this.movieRepository.remove(movie);
  }
}
