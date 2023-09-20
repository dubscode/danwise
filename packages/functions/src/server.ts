import {
  LambdaHandler,
  handlers,
  startServerAndCreateLambdaHandler,
} from '@as-integrations/aws-lambda';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { schema } from './apollo/schema';

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
  ],
});

export const handler: LambdaHandler<any> = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);
