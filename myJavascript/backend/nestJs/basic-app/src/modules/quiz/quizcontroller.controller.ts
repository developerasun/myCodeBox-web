import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz') // route
export class QuizcontrollerController {
  // nest js manages the instantiation of the injected class
  constructor(private quizService: QuizService) {}
  @Get('/')
  getAllQuizzes() {
    return this.quizService.getAllQuizzes(); // the injected instantiation
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe) // DTO is delivered through pipe
  createQuiz(@Body() quizData: CreateQuizDto) {
    // make the quizData type-strict
    return { data: quizData };
  }
}
