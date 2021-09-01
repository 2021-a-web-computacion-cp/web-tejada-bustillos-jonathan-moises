import {Controller, Get, HttpCode} from '@nestjs/common';
import { AppService } from './app.service';
import {get} from "http";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('texto')
  @HttpCode(200)
  holaTexto() {
    return 'Hola texto'
  }
  @Get('html')
  @HttpCode(200)
  holaHtml(): string {
    return '<h1>Hola HTML </h1>>'
  }
  @Get('json')
  @HttpCode(200)
  holaJson(): string {
    return '{mensaje:"Hola json"}';
  }


}
