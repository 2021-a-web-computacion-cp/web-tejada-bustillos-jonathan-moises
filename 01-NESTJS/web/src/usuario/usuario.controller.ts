
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import {Prisma} from '@prisma/client'

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
    constructor(
        // Inyeccion dependencias
        private usuarioService: UsuarioService,
    ) {}

    @Get(':idUsuario')
    obtenerUno(@Param() parametrosRuta) {
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }

    @Post()
    insertarUno(@Body() bodyParams){
        return this.usuarioService.crearUno(bodyParams)
    }


}