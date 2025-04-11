import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    Delete,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { InterestsService } from './interests.service';
  import { CreateInterestDto } from './dto/create.dto';
  import { UpdateInterestDto } from './dto/update.dto';
  import { JwtAuthGuard } from '../auth/jwt.guard';
  
  @Controller('interests')
  @UseGuards(JwtAuthGuard)
  export class InterestsController {
    constructor(private readonly interestsService: InterestsService) {}
  
    @Post()
    create(@Body() dto: CreateInterestDto, @Request() req) {
      return this.interestsService.create(dto, req.user);
    }
  
    @Get()
    findAll() {
      return this.interestsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.interestsService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateInterestDto) {
      return this.interestsService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.interestsService.remove(id);
    }
  }