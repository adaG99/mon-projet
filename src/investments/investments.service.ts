import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './investments.entity';
import { CreateInvestmentDto } from './dto/create.dto';
import { UpdateInvestmentDto } from './dto/update.dto';
import { User } from 'src/users/users.entity';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepo: Repository<Investment>,
  ) {}

  async create(dto: CreateInvestmentDto, user: User, project: Project): Promise<Investment> {
    // Vérifier si le projet existe
    if (!project) {
      throw new Error('Project not found');
    }

    // Vérifier si l'utilisateur existe
    if (!user) {
      throw new Error('User not found');
    }

    // Créer l'investissement
    const investment = this.investmentRepo.create({
      amount: dto.amount,
      investor: user,        // Utilisateur qui fait l'investissement
      project,               // Projet auquel l'investissement est associé
    });

    // Sauvegarder l'investissement dans la base de données
    return this.investmentRepo.save(investment);
  }

  async findOne(id: string): Promise<Investment | null> {
    const investment = await this.investmentRepo.findOne({
      where: { id },
      relations: ['investor', 'project'],
    });

    if (!investment) {
      throw new Error('Investment not found');
    }
    return investment;
  }
}