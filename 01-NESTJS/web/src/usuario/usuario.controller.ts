
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
import { UsuarioService } from './usuario.service';
import {Prisma} from '@prisma/client'
import { UsuarioCrearDto} from "./dto/usuaario-crear.dto";
import {validate} from "class-validator";
import {audit, skip} from "rxjs";

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
    constructor(
        // Inyeccion dependencias
        private usuarioService: UsuarioService,
    ) {}



    @Get('crear-formulario')
    vistacrear(
        @Res() response
    ){
        response.render('usuario/crear');
    }



    @Get('inicio')
    inicio(
        @Res() response
    ){
        response.render('inicio');
    }



    @Get('lista-usuarios')
    async listaUsuarios(
        @Res() response,
        @Query() parametrosConsulta
    ){
        try {
            //validar parametros de consulta con un dto
            const respuesta = await this.usuarioService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take? +parametrosConsulta.take: undefined,
                busqueda: parametrosConsulta.busqueda? parametrosConsulta.busqueda: undefined,
            });
           // console.log(respuesta);

            response.render('usuario/lista',{
                datos:{
                    usuario:respuesta,
                }
            });
        }catch (error){
            throw new InternalServerErrorException('error del servidor')
        }
    }

    @Get(':idUsuario')
    obtenerUno(@Param() parametrosRuta) {
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }
    //POst inseguro
    /*@Post()
    insertarUno(@Body() bodyParams){
        return this.usuarioService.crearUno(bodyParams)
    }*/


    //Post validando
    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ) {
        const usuarioCrearDto = new UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const errores = await validate(usuarioCrearDto);
            if (errores.length > 0) {
                throw new BadRequestException('No envia bien parametros');
            } else {
                return this.usuarioService.crearUno(usuarioCrearDto);
            }


        } catch (error) {
            console.error({
                error: error, mensaje: 'Errores en crear usuario'
            })
            throw new InternalServerErrorException('Error Servidor')
        }


    }

    @Put(':idUsuario')
    async editarUno(
        @Body() bodyParams,
        @Param() parametrosRuta,
    ) {
        const usuaarioActualizarDto = new UsuarioCrearDto()
        usuaarioActualizarDto.nombre = bodyParams["nombre"]
        usuaarioActualizarDto.apellido = bodyParams["apellido"]
        try {
            const errores = await validate(usuaarioActualizarDto);
            if (errores.length > 0) {
                throw new BadRequestException('No envia bien parametros');
            } else {
                return this.usuarioService.actualizarUno({
                    where: {id: +parametrosRuta.idUsuario},
                    data: usuaarioActualizarDto
                });
            }

        } catch (error) {
            console.error({
                error: error, mensaje: 'Errores en crear usuario'
            })
            throw new InternalServerErrorException('Error Servidor')
        }
    }

    @Delete(':idUsuario')
    borrarUno(@Param() parametrosRuta){
        return this.usuarioService.eliminarUno({id:+parametrosRuta.idUsuario})
    }



}