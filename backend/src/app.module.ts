import { Module, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import {
    crudResolvers,
    relationResolvers
} from 'prisma/graphql/generated';
// import { RecipesModule } from './recipes/recipes.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLError } from 'graphql';
import { isProd } from './utils';
// import { DateScalar } from './common/scalars/date.scalar';
import { UserModule } from './wallets/user.module';
import { EventsService } from './events/events.service';

const prisma = new PrismaClient({
    log: ['query'],
});

interface Context {
    prisma: PrismaClient;
    headers: any;
    req: any;
}

@Module({
    imports: [
        // RecipesModule,
        ScheduleModule.forRoot(),
        EventEmitterModule.forRoot(),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
            debug: true,
            playground: true,
            tracing: true,
            introspection: true,
            sortSchema: true,
            // context: ({ req }) => ({ req, prisma }),
            context: ({ req }): Context => ({ headers: req.headers, req, prisma }),
            // https://stackoverflow.com/a/64129469
            formatError: (error: GraphQLError) => {
                if (!isProd) console.log('formatError', JSON.stringify(error, null, 2));
                // const graphQLFormattedError: GraphQLFormattedError = {
                //   message: JSON.stringify(error.extensions?.exception?.stacktrace) || error.message,
                // };
                // return graphQLFormattedError;
                return error;
            },
        }),
        UserModule,
    ],
    // providers: (crudResolvers as unknown) as Provider<any>[],
    providers: [
        ...(crudResolvers as unknown as Provider<any>[]),
        ...(relationResolvers as unknown as Provider<any>[]),
        // DateScalar,
        EventsService,
    ],
})
export class AppModule { }
