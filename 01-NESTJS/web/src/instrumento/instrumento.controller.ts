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
    @Get('lista-instrumentos')
    async listaInstrumentos(@Res() response, @Query() parametrosConsulta){
        try {
            const respuesta  = await this.instrumentoService.buscarMuchos({
                skip: parametrosConsulta.skip? +parametrosConsulta.skip: undefined,
                take: parametrosConsulta.take? +parametrosConsulta.take: undefined,
                busqueda: parametrosConsulta.busqueda? parametrosConsulta.busqueda: undefined,
            });

            response.render('instrumento/lista',{
                datos:{
                    instrumento:respuesta,
                    mensaje: parametrosConsulta.mensaje,
                }
                }
            );
        }catch (error){
            throw new InternalServerErrorException('error del servidor')
        }

    }
    @Post('eliminar-instrumento/:idInstrumento')
    async eliminarInstrumento(@Res() response, @Param() parametrosRuta) {
        try {
            await this.instrumentoService.eliminarUno(+parametrosRuta.idInstrumento);
            response.redirect(
                '/instrumentos/lista-instrumentos' + '?mensaje=Se elimino al instrumento',
            );
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error');
        }
    }

    @Post('pedido-editar-instrumento/:idInstrumento')
    async editarInstrumento(@Res() response, @Param() parametrosRuta){
        try{
            const instrumento =await this.instrumentoService.buscarUno(+parametrosRuta.idInstrumento);
            response.render('instrumento/editar',{
                datos:{
                    instrumento:instrumento
                }
            })
        }catch (error){
            throw new InternalServerErrorException('error del servidor')
        }
    }

    @Post('editar-instrumento-formulario')
    async editarUsuarioFormulario(@Res() response, @Body() parametrosCuerpo, @Query() query) {
        const intrumentoEditarDto= new InstrumentoEditarDto()
        intrumentoEditarDto.id=Number(query.id);
        intrumentoEditarDto.nombre= parametrosCuerpo.nombre;
        intrumentoEditarDto.tipo=parametrosCuerpo.tipo;
        intrumentoEditarDto.cantidad= +parametrosCuerpo.cantidad;
        intrumentoEditarDto.fechaRegistro=parametrosCuerpo.fechaRegistro;
        if(parametrosCuerpo.usado=="true"){
            intrumentoEditarDto.usado=true;
        }else if(parametrosCuerpo.usado=="false") {
            intrumentoEditarDto.usado = false;
        }else {
            intrumentoEditarDto.usado = parametrosCuerpo.usado;
        }

        intrumentoEditarDto.precio= Number(parametrosCuerpo.precio);



        try {
            const errores = await validate(intrumentoEditarDto)
            if(errores.length>0){
                console.log(JSON.stringify(errores));
                throw new BadRequestException("No envia bien parametros");

            }else{
                //return this.instrumentoService.crearUno(intrumentoCrearDto)
                const respuestaInstrumento = await this.instrumentoService.actualizarUno({id:intrumentoEditarDto.id,data:intrumentoEditarDto});
                response.redirect(
                    '/instrumentos/lista-instrumentos' +
                    '?mensaje=Se edito el instrumento ' +
                    parametrosCuerpo.nombre,
                );
            }


        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error creando usuario');
        }
    }
}