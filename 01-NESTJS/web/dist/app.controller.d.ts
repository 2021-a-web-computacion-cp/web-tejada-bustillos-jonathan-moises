import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    ejecutarSuma(queryParams: any, respuesta: any, request: any): number | "finalizo el juego ";
    ejecutarResta(bodyParams: any, respuesta: any, request: any, cabecera: any): number | "finalizo el juego ";
    ejecutarMultiplicacion(params: any, respuesta: any, request: any): number | "finalizo el juego ";
    ejecutarDivision(params: any, respuesta: any, request: any): number | "finalizo el juego ";
    getHello(): string;
    holaTexto(): string;
    holaHtml(): string;
    holaJson(): string;
    badRequest(): void;
    internalError(): void;
    setearCookieInsegura(req: any, res: any): void;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
    parametroConsulta(queryParams: any, params: any): {
        parametrosConsulta: any;
        parametrosRuta: any;
    };
    parametrosCuerpo(bodyParams: any, cabecerasPeticion: any): {
        parametrosCuerpo: any;
        cabeceras: any;
    };
}
