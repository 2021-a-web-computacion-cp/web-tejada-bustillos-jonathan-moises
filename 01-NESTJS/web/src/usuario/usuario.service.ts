import {Injectable} from '@nestjs/common'
import {PrismaService} from "../prisma.service";
import {Prisma} from '@prisma/client'
@Injectable()
export class UsuarioService {
    constructor(//inyectar dependencias
        private prisma: PrismaService,) {

   }

   buscarUno(id: number){
        return this.prisma.ePN_USUARIO.findUnique({
            where:{
                id: id,
            },
        });

   }

    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
        // orderBy?: Prisma.EPN_UsuarioOrder;
        }) {
        const or = parametrosBusqueda.busqueda
            ? {
            OR: [
                { nombre: { contains: parametrosBusqueda.busqueda } },
                { apellido: { contains: parametrosBusqueda.busqueda } },
            ],
            }
            : {};
        return this.prisma.ePN_USUARIO.findMany({
            where: or,
            take: Number(parametrosBusqueda.take) || undefined,
            skip: Number(parametrosBusqueda.skip) || undefined,
        });
    }

   crearUno(usuario: Prisma.EPN_USUARIOCreateInput){
        return this.prisma.ePN_USUARIO.create({
            data: usuario,
        });
   }

    actualizarUno(parametrosParaActualizar:{
        where: Prisma.EPN_USUARIOWhereUniqueInput;
        data: Prisma.EPN_USUARIOUpdateInput;
    }){
        return this.prisma.ePN_USUARIO.update({
            data:parametrosParaActualizar.data,
            where: parametrosParaActualizar.where,
        });
    }
/*actualizarUno(parametrosActualizar: {
id: number;
data: Prisma.EPN_USUARIOUpdateInput;
}) {
return this.prisma.ePN_USUARIO.update({
data: parametrosActualizar.data,
where: {
id: parametrosActualizar.id,
},
});
}*/

    /*
    * eliminarUno(id: number) {
    * return this.prisma.ePN_USUARIO.delete({
    * where: { id: id },
    * });
    * }
    * */
    eliminarUno(where: Prisma.EPN_USUARIOWhereUniqueInput){
        return this.prisma.ePN_USUARIO.delete({
            where: where
        })
    }
}