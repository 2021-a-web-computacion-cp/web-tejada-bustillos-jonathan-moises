import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./prisma.service";
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioModule} from "./usuario/usuario.module";
import {InstrumentoModule} from "./instrumento/instrumento.module";

@Module({
  imports: [//moudlos importados
    UsuarioModule,
      InstrumentoModule,
  ],
  controllers: [// controladores
      AppController
     ],
  providers: [//servicios
      AppService,
  PrismaService,
  ],
  exports:[ //servicios Exportados(que se puedan utilizar en otros modulos )
    AppService,
  ],
})
export class AppModule {}


