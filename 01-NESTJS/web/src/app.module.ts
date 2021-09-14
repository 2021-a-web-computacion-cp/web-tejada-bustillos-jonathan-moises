import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./prisma.service";

@Module({
  imports: [//moudlos importados

  ],
  controllers: [// controladores
      AppController
     ],
  providers: [//servicios
      AppService,
  PrismaService,
  ],
  exports:[ //servicios Exportados(que se puedan utilizar en otros modulos )

  ]
})
export class AppModule {}


