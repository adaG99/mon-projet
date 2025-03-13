import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = this.userRepository.create({ ...data, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async login(data: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return { access_token: this.jwtService.sign({ id: user.id, role: user.role }) };
  }
}
