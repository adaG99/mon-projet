import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    NotFoundException,
    } from '@nestjs/common';
    import { InvestmentsService } from './investments.service';
    import { CreateInvestmentDto } from './dto/create.dto';
    import { JwtAuthGuard } from '../auth/jwt.guard';
    import { ProjectsService } from 'src/projects/projects.service';
    
    @Controller('investments')
    export class InvestmentsController {
    constructor(
    private readonly investmentsService: InvestmentsService,
    private readonly projectsService: ProjectsService,
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createInvestment(
    @Body() dto: CreateInvestmentDto,
    @Request() req,
    ) {
    const user = req.user;
     const project = await this.projectsService.findOne(dto.projectId);
    
    if (!project) {
     throw new NotFoundException(`Project with id ${dto.projectId} not found`);
    }
    
     return this.investmentsService.create(dto, user, project);
    }
    }
    