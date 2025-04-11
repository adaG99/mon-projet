import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateInvestmentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  projectId: string; 
}