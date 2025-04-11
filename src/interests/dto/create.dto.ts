import { IsNotEmpty } from 'class-validator';

export class CreateInterestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}