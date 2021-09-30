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

    }) {
        const or = parametrosBusqueda.busqueda
            ? {
                OR: [
                    { tipo: { contains: parametrosBusqueda.busqueda } },
                    { nombre: { contains: parametrosBusqueda.busqueda } }

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

    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.InstrumentosUpdateInput;
    }) {
        return this.prisma.instrumentos.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id,
            },
        });
    }


    eliminarUno(id: number) {
        return this.prisma.instrumentos.delete({
            where: { id: id },
        });
    }

}