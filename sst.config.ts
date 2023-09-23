import { ApiStack } from './stacks/api-stack';
import { DomainStack } from './stacks/domain-stack';
import { DynamoStack } from './stacks/dynamo-stack';
import { SSTConfig } from 'sst';
import { Tags } from 'aws-cdk-lib';
import { WebStack } from './stacks/web-stack';

export default {
  config(_input) {
    return {
      name: 'danwise',
      region: 'us-west-2',
      profile: 'wise',
      bootstrapStackName: 'danwisedev-bootstrap',
    };
  },
  stacks(app) {
    Tags.of(app).add('app', 'danwisedev');

    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
      logRetention: 'five_days',
      timeout: 300,
    });

    app.addDefaultFunctionEnv({
      STAGE_NAME: app.stage,
    });

    if (app.stage !== 'prod') {
      app.setDefaultRemovalPolicy('destroy');
    }

    app
      .stack(DomainStack, { id: 'domain-stack' })
      .stack(DynamoStack, { id: 'dynamo-stack' })
      .stack(ApiStack, { id: 'api-stack' })
      .stack(WebStack, { id: 'web-stack' });
  },
} as SSTConfig;
