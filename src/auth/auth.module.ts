import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Owner } from 'src/owners/owner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]),
    JwtModule.register({
      global: true,
      secret: 'kolap',
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService
  ]
})
export class AuthModule {}
