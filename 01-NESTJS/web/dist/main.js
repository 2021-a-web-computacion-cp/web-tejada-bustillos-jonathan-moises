"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.set('view engine', 'ejs');
    app.use(express.static('publico'));
    app.use(cookieParser('Me agradan los poliperros'));
    app.use(session({
        name: 'Server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: true,
        saveUnintialized: true,
        cookie: {
            secure: false
        },
        store: new FileStore(),
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map