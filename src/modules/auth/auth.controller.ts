import {
  Headers,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateOwnerDto } from 'src/modules/owners/create-owner.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Headers('username') username: string,
    @Headers('password') password: string,
  ) {
    return this.authService.signIn(username, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() user: CreateOwnerDto) {
    return this.authService.register(user);
  }
}
