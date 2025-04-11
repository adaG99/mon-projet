import {
    Controller, Post, Get, Param, Body, Delete, Put, UseGuards, Request
  } from '@nestjs/common';
  import { ProjectsService } from './projects.service';
  import { CreateProjectDto } from './dto/create-project.dto';
  import { JwtAuthGuard } from '../auth/jwt.guard';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  
  @Controller('projects')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}
  
    @Post()
    @Roles('entrepreneur')
    create(@Body() dto: CreateProjectDto, @Request() req) {
      return this.projectsService.create(dto, req.user);
    }
  
    @Get()
    findAll() {
      return this.projectsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.projectsService.findOne(id);
    }
  
    @Put(':id')
    @Roles('entrepreneur')
    update(@Param('id') id: string, @Body() dto: CreateProjectDto, @Request() req) {
      return this.projectsService.update(id, dto, req.user);
    }
  
    @Delete(':id')
    @Roles('entrepreneur', 'admin')
    remove(@Param('id') id: string, @Request() req) {
      return this.projectsService.remove(id, req.user, req.user.role === 'admin');
    }
  }