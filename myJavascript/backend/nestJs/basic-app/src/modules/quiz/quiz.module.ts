import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizcontrollerController } from './quizcontroller.controller';

@Module({
  providers: [QuizService],
  controllers: [QuizcontrollerController],
})
export class QuizModule {}
