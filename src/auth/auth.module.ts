import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from 'src/owners/owner.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  controllers: [AuthController],
  providers: [AuthService, JwtService]
})
export class AuthModule {}
