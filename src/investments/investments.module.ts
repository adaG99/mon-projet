import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './investments.entity';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), UsersModule, ProjectsModule],
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
})
export class InvestmentsModule {}