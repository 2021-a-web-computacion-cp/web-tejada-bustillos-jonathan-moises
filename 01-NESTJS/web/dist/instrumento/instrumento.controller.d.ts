import { InstrumentoService } from './instrumento.service';
export declare class InstrumentoController {
    private instrumentoService;
    constructor(instrumentoService: InstrumentoService);
    crearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
}
