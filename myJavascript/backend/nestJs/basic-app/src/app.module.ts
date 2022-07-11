import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { typeormOptions } from './config/typeorm.config';
import { ReturnNameModule } from './modules/return-name/return-name.module';

@Module({
  imports: [
    QuizModule,
    ReturnNameModule,
    TypeOrmModule.forRoot(typeormOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
