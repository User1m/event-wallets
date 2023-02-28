"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const generated_1 = require("../prisma/graphql/generated");
const schedule_1 = require("@nestjs/schedule");
const event_emitter_1 = require("@nestjs/event-emitter");
const utils_1 = require("./utils");
const user_module_1 = require("./wallets/user.module");
const events_service_1 = require("./events/events.service");
const prisma = new client_1.PrismaClient({
    log: ['query'],
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            event_emitter_1.EventEmitterModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                installSubscriptionHandlers: true,
                autoSchemaFile: 'schema.gql',
                debug: true,
                playground: true,
                tracing: true,
                introspection: true,
                sortSchema: true,
                context: ({ req }) => ({ headers: req.headers, req, prisma }),
                formatError: (error) => {
                    if (!utils_1.isProd)
                        console.log('formatError', JSON.stringify(error, null, 2));
                    return error;
                },
            }),
            user_module_1.UserModule,
        ],
        providers: [
            ...generated_1.crudResolvers,
            ...generated_1.relationResolvers,
            events_service_1.EventsService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map