"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrumentoModule = void 0;
const common_1 = require("@nestjs/common");
const instrumento_service_1 = require("./instrumento.service");
const instrumento_controller_1 = require("./instrumento.controller");
const prisma_service_1 = require("../prisma.service");
let InstrumentoModule = class InstrumentoModule {
};
InstrumentoModule = __decorate([
    common_1.Module({
        imports: [],
        providers: [
            instrumento_service_1.InstrumentoService,
            prisma_service_1.PrismaService,
        ],
        exports: [
            instrumento_service_1.InstrumentoService,
        ],
        controllers: [
            instrumento_controller_1.InstrumentoController,
        ],
    })
], InstrumentoModule);
exports.InstrumentoModule = InstrumentoModule;
//# sourceMappingURL=instrumento.module.js.map