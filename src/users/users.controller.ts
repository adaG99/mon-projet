import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  
  @Get()
  getAllUsers() {
    const users = [
      { id: 1, name: 'Adama' },
      { id: 2, name: 'Kine' },
      { id: 3, name: 'coucou les gens' },
    ];
    return users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const users = [
      { id: 1, name: 'Adama' },
      { id: 2, name: 'Kine' },
      { id: 3, name: 'coucou les gens' },
    ];
    return users.find(user => user.id === Number(id));
  }
}
