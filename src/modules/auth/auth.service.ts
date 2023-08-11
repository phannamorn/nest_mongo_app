import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from 'src/types/token.payload';
import { Session } from './session.entity';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    private jwtService: JwtService
  ) {}

  async signIn(userName: string, password: string, ip: string, userAgent: string) {
    const user: User = await this.userRepository.findOne({where: { userName }});

    if (!user) {
      throw new NotFoundException('Account does not exist. Please create an account or try again with a different username.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials. Please check your username and password and try again.');
    }

    const payload: TokenPayload = { 
      sub: user.id,
      userName,
      scope: 'read'
    };

    const accessToken = await this.jwtService.signAsync(payload, {secret: 'kolap', expiresIn: '30d'});

    this.sessionRepository.insert({userId: user.id, accessToken, userAgent, ip});

    return {access_token: accessToken};
  }

  async register(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    const user = await this.userRepository.save(createUserDto);
    return user;
  }
}
