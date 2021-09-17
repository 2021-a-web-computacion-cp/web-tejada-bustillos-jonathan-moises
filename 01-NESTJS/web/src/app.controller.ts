import {
  BadRequestException, Body, Headers,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  Res, Query, Param, Header, Put
} from '@nestjs/common';
import { AppService } from './app.service';
import {get} from "http";
import {query} from "express";
import {ok} from "assert";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("suma")
  @HttpCode(200)
  ejecutarSuma(@Query() queryParams,@Res({passthrough: true}) respuesta,@Req() request){
    if (request.signedCookies["total"]==undefined){
      respuesta.cookie(
          'total',
          100,
        {
          signed: true
        }
      )
      respuesta.sendStatus(200)
      return 100
    }else{
      if(request.signedCookies["total"]<=0){
        respuesta.cookie(
            'total',
            100,
        {
          signed: true
        }
        )
        return "finalizo el juego "

      }else{

        let numero=Number(request.signedCookies["total"])-Number(queryParams.uno)-Number(queryParams.dos)

        respuesta.cookie(
            'total',
            numero,
         {
          signed: true
        }
        )


        return numero


      }

    }
  }

  @Post("resta")
  @HttpCode(201)
  //@Header('resultado',"0")
  ejecutarResta(@Body() bodyParams,@Res({passthrough: true}) respuesta,@Req() request,@Headers() cabecera){
    if (request.signedCookies["total"]==undefined){
      respuesta.cookie(
          'total',
          100,
          {
            signed: true
          }
      )
      respuesta.header('resultado',"100")
      return 100
    }else{
      if(request.signedCookies["total"]<=0){
        respuesta.cookie(
            'total',
            100,
            {
              signed: true
            }
        )
        respuesta.header('resultado',"100")



        return "finalizo el juego "

      }else{
        //console.log("hola")
        let numero=Number(request.signedCookies["total"])-(Number(bodyParams.uno)-Number(bodyParams.dos))
        //console.log(numero)
        respuesta.cookie(
            'total',
            numero,
            {
              signed: true
            }
        )
        respuesta.header('resultado',numero.toString())

        //console.log("holaw")

        return numero


      }

    }
  }

  @Put("multiplicacion/:uno/:dos")
  @HttpCode(201)
  ejecutarMultiplicacion(@Param() params,@Res({passthrough: true}) respuesta,@Req() request){
    if (request.signedCookies["total"]==undefined){
      respuesta.cookie(
          'total',
          100,
          {
            signed: true
          }
      )
      return 100
    }else{
      if(request.signedCookies["total"]<=0){
        respuesta.cookie(
            'total',
            100,
            {
              signed: true
            }
        )

        return "finalizo el juego "

      }else{
        let numero=Number(request.signedCookies["total"])-(Number(params.uno)*Number(params.dos))
        respuesta.cookie(
            'total',
            numero,
            {
              signed: true
            }
        )
        return numero


      }

    }
  }

  @Put("division/:uno/:dos")
  @HttpCode(201)
  ejecutarDivision(@Param() params,@Res({passthrough: true}) respuesta,@Req() request){
    if (request.signedCookies["total"]==undefined){
      respuesta.cookie(
          'total',
          100,
          {
            signed: true
          }
      )
      return 100
    }else{
      if(request.signedCookies["total"]<=0){
        respuesta.cookie(
            'total',
            100,
            {
              signed: true
            }
        )

        return "finalizo el juego "

      }else{
        let numero=Number(request.signedCookies["total"])-(Number(params.uno)/Number(params.dos))
        respuesta.cookie(
            'total',
            numero,
            {
              signed: true
            }
        )
        return numero


      }

    }
  }



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

