import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuizcontrollerController } from './modules/quiz/quizcontroller.controller';

@Module({
  imports: [QuizModule],
  controllers: [AppController, QuizcontrollerController],
  providers: [AppService],
})
export class AppModule {}
