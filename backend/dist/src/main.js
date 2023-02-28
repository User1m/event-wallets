"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const utils_1 = require("./utils");
const graphql_upload_ts_1 = require("graphql-upload-ts");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        disableErrorMessages: utils_1.isProd ? true : false,
        forbidUnknownValues: false,
    }));
    app.use(graphql_upload_ts_1.graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch(console.error);
if (utils_1.isProd) {
    global.console.log = () => { };
    global.console.warn = () => { };
    global.console.error = () => { };
}
//# sourceMappingURL=main.js.map