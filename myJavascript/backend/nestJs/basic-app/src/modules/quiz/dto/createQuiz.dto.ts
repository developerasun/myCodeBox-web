import { IsNotEmpty, Length } from 'class-validator';

// DTO: for request data validation. for the data to follow a data format server set.
// The DTO is passed through pipe and requires below dependencies
// 1) class-validator 2) class-transformer
export class CreateQuizDto {
  @IsNotEmpty({ message: 'Should have a title' })
  @Length(3, 255)
  title: string;

  @IsNotEmpty()
  @Length(5)
  description: string;
}
