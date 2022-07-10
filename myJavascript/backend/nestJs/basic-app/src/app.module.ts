import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { ReturnNameModule } from './modules/return-name/return-name.module';

@Module({
  imports: [QuizModule, ReturnNameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
