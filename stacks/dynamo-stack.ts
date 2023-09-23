import { RemovalPolicy, Tags } from 'aws-cdk-lib';
import { StackContext, Table } from 'sst/constructs';

export function DynamoStack({ stack }: StackContext) {
  const db = new Table(stack, 'dynamo-table', {
    fields: {
      pk: 'string',
      sk: 'string',
      gsi1pk: 'string',
      gsi1sk: 'string',
      gsi2pk: 'string',
      gsi2sk: 'string',
    },
    primaryIndex: {
      partitionKey: 'pk',
      sortKey: 'sk',
    },
    globalIndexes: {
      gsi1: { partitionKey: 'gsi1pk', sortKey: 'gsi1sk' },
      gsi2: { partitionKey: 'gsi2pk', sortKey: 'gsi2sk' },
    },
    cdk: {
      table: {
        removalPolicy:
          stack.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      },
    },
  });

  Tags.of(db).add('component', 'database');

  return { db };
}
