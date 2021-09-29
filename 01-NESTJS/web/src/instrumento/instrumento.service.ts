import {Injectable} from '@nestjs/common'
import {PrismaService} from "../prisma.service";
import {Prisma} from '@prisma/client'

@Injectable()
export class InstrumentoService{
    constructor(
        private prisma: PrismaService,
    ) {

    }

    buscarUno(id:number){
        return this.prisma.instrumentos.findUnique({
            where:{
                id:id,
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
                    { tipo: { contains: parametrosBusqueda.busqueda } },
                ],
            }
            : {};
        return this.prisma.instrumentos.findMany({
            where: or,
            take: Number(parametrosBusqueda.take) || undefined,
            skip: Number(parametrosBusqueda.skip) || undefined,
        });
    }

    crearUno(instrumento: Prisma.InstrumentosCreateInput){
        return this.prisma.instrumentos.create({
            data: instrumento,
        });
    }

    actualizarUno(parametrosParaActualizar:{
        where: Prisma.InstrumentosWhereUniqueInput;
        data: Prisma.InstrumentosUpdateInput;
    }){
        return this.prisma.instrumentos.update({
            data:parametrosParaActualizar.data,
            where: parametrosParaActualizar.where,
        });
    }
    eliminarUno(where: Prisma.InstrumentosWhereUniqueInput){
        return this.prisma.instrumentos.delete({
            where: where
        })
    }

}