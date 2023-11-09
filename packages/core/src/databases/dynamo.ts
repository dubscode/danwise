import { Config } from 'sst/node/config';
import { DynamoDB } from 'aws-sdk';
import { EntityConfiguration } from 'electrodb';

const DocumentClient = new DynamoDB.DocumentClient();

export const Configuration: EntityConfiguration = {
  table: Config.TABLE_NAME,
  client: DocumentClient,
};
