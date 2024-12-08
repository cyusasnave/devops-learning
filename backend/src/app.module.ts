import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './db/db.service';
import { Movie } from './movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
