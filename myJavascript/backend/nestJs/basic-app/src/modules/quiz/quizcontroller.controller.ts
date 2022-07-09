import { Controller, Get } from '@nestjs/common';

@Controller('quizcontroller')
export class QuizcontrollerController {
  @Get('/')
  getAllQuiz() {
    return [1, 2, 3];
  }
}
