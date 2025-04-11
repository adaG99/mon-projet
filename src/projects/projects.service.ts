import {
      Injectable,
      NotFoundException,
      ForbiddenException,
    } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { Project } from './entities/project.entity';
    import { CreateProjectDto } from './dto/create-project.dto';
    import { User } from '../users/users.entity';
    
    @Injectable()
    export class ProjectsService {
      constructor(
        @InjectRepository(Project)
        private projectRepo: Repository<Project>,
 ) {}
    
     create(createProjectDto: CreateProjectDto, user: User) {
        const project = this.projectRepo.create({
          ...createProjectDto,
           owner: user,
       });
       return this.projectRepo.save(project);
      }
    
      findAll() {
        return this.projectRepo.find({ relations: ['owner'] });
    }
    
     async findOne(id: string) {
       const project = await this.projectRepo.findOne({
          where: { id },
          relations: ['owner'],
       });
    

     return project; 
       }
    
     async update(id: string, data: Partial<CreateProjectDto>, user: User) {
       const project = await this.projectRepo.findOne({
        where: { id },
         relations: ['owner'],
       });
    
        if (!project) {
         throw new NotFoundException('Project not found');
         }
    
       if (project.owner.id !== user.id) {
        throw new ForbiddenException('Unauthorized');
        }
    
        Object.assign(project, data);
         return this.projectRepo.save(project);
        }
    
      async remove(id: string, user: User, isAdmin: boolean) {
       const project = await this.projectRepo.findOne({
        where: { id },
         relations: ['owner'],
        });
    
     if (!project) {
          throw new NotFoundException('Project not found');
        }
    
       if (project.owner.id !== user.id && !isAdmin) {
         throw new ForbiddenException('Unauthorized');
        }
    
       return this.projectRepo.remove(project);
     }
    }
    