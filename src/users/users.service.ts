import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Récupère tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Récupère un utilisateur par son ID
  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  // Crée un nouvel utilisateur
  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  // Met à jour un utilisateur
  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) {
      // Si l'utilisateur n'est pas trouvé, on lève une exception
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  // Supprime un utilisateur
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}