import { Module } from "@nestjs/common";
import {InstrumentoService} from "./instrumento.service";
import {InstrumentoController} from "./instrumento.controller";
import {PrismaService} from "../prisma.service";

@Module( {
    imports:[

    ],
    providers: [
        // declaramos servicio
        InstrumentoService,
        PrismaService,
    ],
    exports:[
        InstrumentoService,
    ],
    controllers:[
        InstrumentoController,
    ],

})

export class InstrumentoModule {}