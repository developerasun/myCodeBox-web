import { Injectable } from '@nestjs/common';

@Injectable() // linked with controller class' constructor
export class QuizService {
  getAllQuizzes() {
    return [1, 2, 3, 4, 5];
  }
}
