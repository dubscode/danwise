import { DynamoDB } from 'aws-sdk';
import { EntityConfiguration } from 'electrodb';

const DocumentClient = new DynamoDB.DocumentClient();

export const Configuration: EntityConfiguration = {
  table: process.env.TABLE_NAME,
  client: DocumentClient,
};
