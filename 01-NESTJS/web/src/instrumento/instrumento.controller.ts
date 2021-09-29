import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put, Query, Res
} from '@nestjs/common';
import { InstrumentoService } from './instrumento.service';
import {Prisma} from '@prisma/client';
import {InstrumentoCrearDto} from "./dto/instrumento-crear.dto";
import {InstrumentoEditarDto} from "./dto/instrumento-editar.dto";
import {validate} from "class-validator";
import {audit, skip} from "rxjs";
import {urlToHttpOptions} from "url";

// http://localhost:3000/usuario/......
@Controller('instrumentos')
export class InstrumentoController {
    constructor(
        // Inyeccion dependencias
        private instrumentoService: InstrumentoService,
    ) {
    }



    @Post('crear-instrumento-formulario')
    async crearUsuarioFormulario(@Res() response, @Body() parametrosCuerpo) {
        const intrumentoCrearDto= new InstrumentoCrearDto()
        intrumentoCrearDto.nombre= parametrosCuerpo.nombre;
            intrumentoCrearDto.tipo=parametrosCuerpo.tipo;
            intrumentoCrearDto.cantidad= +parametrosCuerpo.cantidad;
        intrumentoCrearDto.fechaRegistro=parametrosCuerpo.fechaRegistro;
        if(parametrosCuerpo.usado=="true"){
            intrumentoCrearDto.usado=true;
        }else if(parametrosCuerpo.usado=="false") {
            intrumentoCrearDto.usado = false;
        }else {
            intrumentoCrearDto.usado = parametrosCuerpo.usado;
        }

            intrumentoCrearDto.precio= Number(parametrosCuerpo.precio);



        try {
            const errores = await validate(intrumentoCrearDto)
            if(errores.length>0){
                console.log(JSON.stringify(errores));
                throw new BadRequestException("No envia bien parametros");

            }else{
                //return this.instrumentoService.crearUno(intrumentoCrearDto)
                const respuestaInstrumento = await this.instrumentoService.crearUno(intrumentoCrearDto);
                response.redirect(
                    '/instrumentos/vista-crear' +
                    '?mensaje=Se creo el instrumento ' +
                    parametrosCuerpo.nombre,
                );
            }


        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error creando usuario');
        }
    }
    @Get('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta) {
        response.render('instrumento/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
}