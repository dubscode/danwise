export * as UserModel from './user';

import { Entity, EntityItem } from 'electrodb';

import { Configuration } from '../databases/dynamo';
import { v4 as uuidv4 } from 'uuid';

export const UserEntity = new Entity(
  {
    model: {
      entity: 'user',
      service: 'danwisedev',
      version: '1',
    },
    attributes: {
      id: {
        type: 'string',
        default: () => uuidv4(),
        required: true,
        readOnly: true,
      },
      clerkId: {
        type: 'string',
        required: false,
        readOnly: false,
      },
      email: {
        type: 'string',
        required: true,
        readOnly: false,
        set: (value?: string) => value?.toLowerCase(),
      },
      name: {
        type: 'string',
        required: false,
        readOnly: false,
      },
      created: {
        type: 'string',
        readOnly: true,
        default: () => new Date().toISOString(),
      },
      updated: {
        type: 'string',
        readOnly: true,
        set: () => new Date().toISOString(),
        watch: '*',
      },
    },
    indexes: {
      primary: {
        pk: {
          field: 'pk',
          composite: ['id'],
        },
        sk: {
          field: 'sk',
          composite: [],
        },
      },
      clerk: {
        index: 'gsi1',
        collection: 'byClerk',
        pk: { field: 'gsi1pk', composite: ['clerkId'] },
        sk: { field: 'gsi1sk', composite: [] },
      },
      email: {
        index: 'gsi2',
        collection: 'byEmail',
        pk: { field: 'gsi2pk', composite: ['email'] },
        sk: { field: 'gsi2sk', composite: [] },
      },
    },
  },
  Configuration,
);

export type UserType = EntityItem<typeof UserEntity>;

interface CreateUserInput {
  clerkId: string;
  email: string;
  name?: string | null;
}

export const createUser = async (input: CreateUserInput) => {
  const { data } = await UserEntity.create({
    clerkId: input.clerkId,
    email: input.email,
    ...(input.name && { name: input.name }),
  }).go();
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await UserEntity.delete({ id }).go();
  return data;
};

export const findOrCreateUser = async (input: CreateUserInput) => {
  const { clerkId, email, name } = input;

  const { data } = await UserEntity.upsert({ email })
    .set({
      clerkId,
      email,
      ...(name && { name }),
    })
    .go({ response: 'all_new' });

  return data;
};

export const findUserByClerkId = async (clerkId: string) => {
  const { data } = await UserEntity.query.clerk({ clerkId }).go();
  return data[0];
};

export const findUserByEmail = async (email: string) => {
  const { data } = await UserEntity.query.email({ email }).go();
  return data[0];
};

export const listUsers = async () => {
  const { data } = await UserEntity.scan.go();
  return data;
};

export const updateUser = async (id: string, input: Partial<UserType>) => {
  const { data } = await UserEntity.patch({ id })
    .set({ ...input })
    .go({ response: 'all_new' });

  return data;
};
