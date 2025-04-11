import { IsOptional, IsNumber } from 'class-validator';

export class UpdateInvestmentDto {
  @IsOptional()
  @IsNumber()
  amount?: number;
}