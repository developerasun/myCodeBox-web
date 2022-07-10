import { Controller, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz') // route
export class QuizcontrollerController {
  // nest js manages the instantiation of the injected class
  constructor(private quizService: QuizService) {}
  @Get('/')
  getAllQuizzes() {
    return this.quizService.getAllQuizzes(); // the injected instantiation
  }
}
