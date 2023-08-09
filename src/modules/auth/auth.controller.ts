import {
  Headers,
  Controller,
  Post,
  Req,
  HttpCode,
  HttpStatus,
  Ip,
  Body
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
    @Req() req: Request,
    @Ip() ip: string,
    @Headers('username') username: string,
    @Headers('password') password: string,
  ) {
    const userAgent = req.headers['user-agent'];console.log("DDDDD:", ip);
    return this.authService.signIn(username, password, userAgent);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() user: CreateOwnerDto) {
    return this.authService.register(user);
  }
}
