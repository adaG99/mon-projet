import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './entities/interest.entity';
import { CreateInterestDto } from './dto/create.dto';
import { UpdateInterestDto } from './dto/update.dto';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}

  async create(dto: CreateInterestDto, user): Promise<Interest> {
    const interest = this.interestRepository.create({ ...dto, user });
    return this.interestRepository.save(interest);
  }

  findAll(): Promise<Interest[]> {
    return this.interestRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Interest> {
    const interest = await this.interestRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!interest) throw new NotFoundException('Interest not found');
    return interest;
  }

  async update(id: string, dto: UpdateInterestDto): Promise<Interest> {
    await this.interestRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.interestRepository.delete(id);
  }
}