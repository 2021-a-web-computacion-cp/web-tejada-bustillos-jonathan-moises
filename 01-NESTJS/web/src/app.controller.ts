import {
  BadRequestException, Body, Headers,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  Res, Query, Param, Header
} from '@nestjs/common';
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
  @Get('bad-request')
  badRequest(){
   throw new BadRequestException();
  }
  @Get('internal-error')
  internalError(){
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
      @Req() req, //request peticion del usuario
      @Res() res, //response
  ){
    res.cookie(
        'galletaInsegura', //nombre
        'tengo hambre', //valor
    );
    res.cookie(
        'galletaSeguraYFirmada',
        'web :3',
        {
          secure: true,//solo se transfire por canales confiables
          signed: true
        }
    );

    res.send('ok')
  };

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req){
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,

    };
    return mensaje;
  }

  @Get('parametros-consulta/:nombre/:apellido')
  @HttpCode(200)
  @Header('cache-control','none') //Cabeceras de respuesta
  @Header('EPN','SISTEMAS')
  parametroConsulta(
      @Query() queryParams, //REQUEST
      @Param() params, //RESPONSE
  ) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    }
  }



  @Post('parametros-cuerpo')//201
  @HttpCode(200)
  parametrosCuerpo(
      @Body() bodyParams,
      @Headers() cabecerasPeticion,
  ){
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion
    }
  }

}

