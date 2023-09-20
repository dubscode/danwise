import * as ssm from 'aws-cdk-lib/aws-ssm';

import { StackContext, StaticSite, use } from 'sst/constructs';

import { DomainStack } from './domain-stack';

export function WebStack({ stack }: StackContext) {
  const { apiDomain, domain, hostedZone } = use(DomainStack);

  const clerkPublishableKey = ssm.StringParameter.fromStringParameterAttributes(
    stack,
    'CLERK_PUBLISHABLE_KEY',
    {
      parameterName: '/danwise/CLERK_PUBLISHABLE_KEY',
    },
  );

  new StaticSite(stack, 'web-stack', {
    customDomain: {
      domainAlias: 'www.' + domain,
      domainName: domain,
      hostedZone: hostedZone,
    },
    path: 'apps/web',
    buildOutput: 'dist',
    buildCommand: 'npm run build',
    environment: {
      VITE_APP_API_URL: `https://${apiDomain}/graphql`,
      VITE_CLERK_PUBLISHABLE_KEY: clerkPublishableKey.stringValue || '',
      VITE_STAGE_NAME: stack.stage,
    },
  });
}
