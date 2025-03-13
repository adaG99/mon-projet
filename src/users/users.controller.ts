import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { User } from './users.entity';
  import { JwtAuthGuard } from '../auth/jwt.guard';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    
    // GET /users/profile - Récupère le profil de l'utilisateur connecté (protégé)
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  
    // GET /users - Récupère tous les utilisateurs (peut être réservé à l'admin)
    @Get()
    getAllUsers(): Promise<User[]> {
      return this.usersService.findAll();
    }
  
    // GET /users/:id - Récupère un utilisateur par son ID
    @Get(':id')
    getUserById(@Param('id') id: string): Promise<User | null> {
      return this.usersService.findOne(id);
    }
  
    // POST /users - Crée un nouvel utilisateur
    @Post()
    createUser(@Body() userData: Partial<User>): Promise<User> {
      return this.usersService.create(userData);
    }
  
    // PUT /users/:id - Met à jour un utilisateur existant
    @Put(':id')
    updateUser(
      @Param('id') id: string,
      @Body() userData: Partial<User>,
    ): Promise<User> {
      return this.usersService.update(id, userData);
    }
  
    // DELETE /users/:id - Supprime un utilisateur
    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<void> {
      return this.usersService.remove(id);
    }
  }
  