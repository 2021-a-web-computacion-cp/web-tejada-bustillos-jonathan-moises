
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put, Res
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import {Prisma} from '@prisma/client'
import { UsuarioCrearDto} from "./dto/usuaario-crear.dto";
import {validate} from "class-validator";

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
    constructor(
        // Inyeccion dependencias
        private usuarioService: UsuarioService,
    ) {}



    @Get('lista-usuarios')
    listaUsuarios(
        @Res() response
    ){
        response.render('inicio');
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
    editarUno(
        @Body() bodyParams,
        @Param() parametrosRuta,
    ){
        return this.usuarioService.actualizarUno({where:{id:+parametrosRuta.idUsuario},data:bodyParams});
    }

    @Delete(':idUsuario')
    borrarUno(@Param() parametrosRuta){
        return this.usuarioService.eliminarUno({id:+parametrosRuta.idUsuario})
    }



}