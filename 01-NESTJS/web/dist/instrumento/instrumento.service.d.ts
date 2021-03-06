import { PrismaService } from "../prisma.service";
import { Prisma } from '@prisma/client';
export declare class InstrumentoService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__InstrumentosClient<import(".prisma/client").Instrumentos>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Instrumentos[]>;
    crearUno(instrumento: Prisma.InstrumentosCreateInput): Prisma.Prisma__InstrumentosClient<import(".prisma/client").Instrumentos>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.InstrumentosUpdateInput;
    }): Prisma.Prisma__InstrumentosClient<import(".prisma/client").Instrumentos>;
    eliminarUno(id: number): Prisma.Prisma__InstrumentosClient<import(".prisma/client").Instrumentos>;
}
