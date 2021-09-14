import { UsuarioService } from './usuario.service';
import { Prisma } from '@prisma/client';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    obtenerUno(parametrosRuta: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    insertarUno(bodyParams: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}
