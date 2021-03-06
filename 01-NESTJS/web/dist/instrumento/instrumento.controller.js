"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrumentoController = void 0;
const common_1 = require("@nestjs/common");
const instrumento_service_1 = require("./instrumento.service");
const instrumento_crear_dto_1 = require("./dto/instrumento-crear.dto");
const instrumento_editar_dto_1 = require("./dto/instrumento-editar.dto");
const class_validator_1 = require("class-validator");
let InstrumentoController = class InstrumentoController {
    constructor(instrumentoService) {
        this.instrumentoService = instrumentoService;
    }
    async crearUsuarioFormulario(response, parametrosCuerpo) {
        const intrumentoCrearDto = new instrumento_crear_dto_1.InstrumentoCrearDto();
        intrumentoCrearDto.nombre = parametrosCuerpo.nombre;
        intrumentoCrearDto.tipo = parametrosCuerpo.tipo;
        intrumentoCrearDto.cantidad = +parametrosCuerpo.cantidad;
        intrumentoCrearDto.fechaRegistro = parametrosCuerpo.fechaRegistro;
        if (parametrosCuerpo.usado == "true") {
            intrumentoCrearDto.usado = true;
        }
        else if (parametrosCuerpo.usado == "false") {
            intrumentoCrearDto.usado = false;
        }
        else {
            intrumentoCrearDto.usado = parametrosCuerpo.usado;
        }
        intrumentoCrearDto.precio = Number(parametrosCuerpo.precio);
        try {
            const errores = await class_validator_1.validate(intrumentoCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException("No envia bien parametros");
            }
            else {
                const respuestaInstrumento = await this.instrumentoService.crearUno(intrumentoCrearDto);
                response.redirect('/instrumentos/vista-crear' +
                    '?mensaje=Se creo el instrumento ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando usuario');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('instrumento/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async listaInstrumentos(response, parametrosConsulta) {
        try {
            const respuesta = await this.instrumentoService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            response.render('instrumento/lista', {
                datos: {
                    instrumento: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                }
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('error del servidor');
        }
    }
    async eliminarInstrumento(response, parametrosRuta) {
        try {
            await this.instrumentoService.eliminarUno(+parametrosRuta.idInstrumento);
            response.redirect('/instrumentos/lista-instrumentos' + '?mensaje=Se elimino al instrumento');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async editarInstrumento(response, parametrosRuta) {
        try {
            const instrumento = await this.instrumentoService.buscarUno(+parametrosRuta.idInstrumento);
            response.render('instrumento/editar', {
                datos: {
                    instrumento: instrumento
                }
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('error del servidor');
        }
    }
    async editarUsuarioFormulario(response, parametrosCuerpo, query) {
        const intrumentoEditarDto = new instrumento_editar_dto_1.InstrumentoEditarDto();
        intrumentoEditarDto.id = Number(query.id);
        intrumentoEditarDto.nombre = parametrosCuerpo.nombre;
        intrumentoEditarDto.tipo = parametrosCuerpo.tipo;
        intrumentoEditarDto.cantidad = +parametrosCuerpo.cantidad;
        intrumentoEditarDto.fechaRegistro = parametrosCuerpo.fechaRegistro;
        if (parametrosCuerpo.usado == "true") {
            intrumentoEditarDto.usado = true;
        }
        else if (parametrosCuerpo.usado == "false") {
            intrumentoEditarDto.usado = false;
        }
        else {
            intrumentoEditarDto.usado = parametrosCuerpo.usado;
        }
        intrumentoEditarDto.precio = Number(parametrosCuerpo.precio);
        try {
            const errores = await class_validator_1.validate(intrumentoEditarDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException("No envia bien parametros");
            }
            else {
                const respuestaInstrumento = await this.instrumentoService.actualizarUno({ id: intrumentoEditarDto.id, data: intrumentoEditarDto });
                response.redirect('/instrumentos/lista-instrumentos' +
                    '?mensaje=Se edito el instrumento ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando usuario');
        }
    }
};
__decorate([
    common_1.Post('crear-instrumento-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InstrumentoController.prototype, "crearUsuarioFormulario", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], InstrumentoController.prototype, "vistaCrear", null);
__decorate([
    common_1.Get('lista-instrumentos'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InstrumentoController.prototype, "listaInstrumentos", null);
__decorate([
    common_1.Post('eliminar-instrumento/:idInstrumento'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InstrumentoController.prototype, "eliminarInstrumento", null);
__decorate([
    common_1.Post('pedido-editar-instrumento/:idInstrumento'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InstrumentoController.prototype, "editarInstrumento", null);
__decorate([
    common_1.Post('editar-instrumento-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InstrumentoController.prototype, "editarUsuarioFormulario", null);
InstrumentoController = __decorate([
    common_1.Controller('instrumentos'),
    __metadata("design:paramtypes", [instrumento_service_1.InstrumentoService])
], InstrumentoController);
exports.InstrumentoController = InstrumentoController;
//# sourceMappingURL=instrumento.controller.js.map