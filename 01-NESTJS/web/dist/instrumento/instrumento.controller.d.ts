import { InstrumentoService } from './instrumento.service';
export declare class InstrumentoController {
    private instrumentoService;
    constructor(instrumentoService: InstrumentoService);
    crearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    listaInstrumentos(response: any, parametrosConsulta: any): Promise<void>;
    eliminarInstrumento(response: any, parametrosRuta: any): Promise<void>;
    editarInstrumento(response: any, parametrosRuta: any): Promise<void>;
    editarUsuarioFormulario(response: any, parametrosCuerpo: any, query: any): Promise<void>;
}
