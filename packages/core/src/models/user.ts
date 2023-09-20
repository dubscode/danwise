export * as UserModel from './user';

export type UserType = {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  created: Date;
  updated: Date;
};

export const createUser = async () => {
  return {} as UserType;
};

export const listUsers = async () => {
  return [];
};
