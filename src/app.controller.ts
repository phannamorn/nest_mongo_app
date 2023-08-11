import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatDto } from './modules/cats/cat.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
