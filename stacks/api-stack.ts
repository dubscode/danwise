import { Api, StackContext, use } from 'sst/constructs';

import { DomainStack } from './domain-stack';

export function ApiStack({ stack }: StackContext) {
  const { allowOrigins, apiDomain, hostedZone } = use(DomainStack);

  const api = new Api(stack, 'api-stack', {
    cors: {
      allowCredentials: true,
      allowHeaders: ['content-type', 'authorization', 'accept'],
      allowMethods: ['ANY'],
      allowOrigins,
    },
    customDomain: {
      domainName: apiDomain,
      hostedZone: hostedZone,
    },
    routes: {
      'POST /graphql': {
        type: 'graphql',
        function: {
          handler: 'packages/functions/src/server.handler',
          memorySize: '2 GB',
        },
        pothos: {
          schema: 'packages/functions/src/apollo/schema.ts',
          output: 'packages/core/src/graphql/schema.graphql',
          commands: ['echo "Place my codegen commands here."'],
        },
      },
      'GET /graphql': {
        type: 'graphql',
        function: {
          handler: 'packages/functions/src/server.handler',
          memorySize: '2 GB',
        },
      },
    },
  });

  const apiUrl = api.customDomainUrl || api.url;
  const graphqlUrl = `${apiUrl}/graphql`;

  stack.addOutputs({
    ApiUrl: apiUrl,
    GraphqlUrl: graphqlUrl,
  });

  return { api, graphqlUrl, apiUrl };
}
