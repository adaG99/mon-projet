import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from '../users/users.entity';
  import { Project } from '../projects/entities/project.entity';
  
  @Entity('investments')
  export class Investment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('decimal')
    amount: number;
  
    @ManyToOne(() => User, (user) => user.id)
    investor: User;
  
    @ManyToOne(() => Project, (project) => project.id)
    project: Project;
  
    @CreateDateColumn()
    createdAt: Date;
  }