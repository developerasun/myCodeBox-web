import { Module } from '@nestjs/common';
import { QuizcontrollerController } from './quizcontroller.controller';

@Module({
  controllers: [QuizcontrollerController],
})
export class QuizModule {}
