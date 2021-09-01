import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [//moudlos importados

  ],
  controllers: [// controladores
      AppController
     ],
  providers: [//servicios
      AppService],
  exports:[ //servicios Exportados(que se puedan utilizar en otros modulos )

  ]
})
export class AppModule {}


