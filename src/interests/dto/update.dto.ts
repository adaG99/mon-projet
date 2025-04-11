import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestDto } from './create.dto';

export class UpdateInterestDto extends PartialType(CreateInterestDto) {}