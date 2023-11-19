import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postForm(@Body() form: any) {
    console.log('body')
    console.log(form)
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
