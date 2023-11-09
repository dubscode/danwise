import { afterAll, describe, expect, it } from 'vitest';

import { UserModel } from './user';
import { faker } from '@faker-js/faker';

let testUsersIds: string[] = [];

const testUser = async () => {
  const userArgs = {
    email: faker.internet.email(),
    clerkId: faker.string.uuid(),
    name: faker.person.fullName(),
  };
  const user = await UserModel.createUser(userArgs);
  testUsersIds.push(user.id);
  return { user, userArgs };
};

describe('User', () => {
  afterAll(async () => {
    const result = await UserModel.UserEntity.delete(
      testUsersIds.map((id) => ({ id })),
    ).go();
    testUsersIds = [];
  });

  describe('createUser', () => {
    it('downcases the email', async () => {
      const { user, userArgs } = await testUser();

      expect(user.email).toEqual(userArgs.email.toLowerCase());
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const { user } = await testUser();

      const deletedUser = await UserModel.deleteUser(user.id);
      expect(deletedUser.id).toEqual(user.id);
    });
  });

  describe('listUsers', () => {
    it('should return an array', async () => {
      const users = await UserModel.listUsers();
      expect(Array.isArray(users)).toBe(true);
    });
  });

  describe('findOrCreateUser', () => {
    it('should return a user', async () => {
      const { user } = await testUser();

      expect(user.id).toBeTruthy();
    });

    it.skip('should update an existing user', async () => {
      const { user, userArgs } = await testUser();

      const newName = faker.person.fullName();
      const updatedUser = await UserModel.findOrCreateUser({
        ...userArgs,
        name: newName,
      });
      testUsersIds.push(updatedUser.id);

      expect(updatedUser.id).toEqual(user.id);
      expect(updatedUser.name).toEqual(newName);
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user', async () => {
      const { user, userArgs } = await testUser();

      const foundUser = await UserModel.findUserByEmail(userArgs.email);
      expect(foundUser.id).toEqual(user.id);
    });
  });

  describe('findUserByClerkId', () => {
    it('should return a user', async () => {
      const { user, userArgs } = await testUser();

      const foundUser = await UserModel.findUserByClerkId(userArgs.clerkId);
      expect(foundUser.id).toEqual(user.id);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const { user } = await testUser();

      const newName = faker.person.fullName();
      const updatedUser = await UserModel.updateUser(user.id, {
        name: newName,
      });
      expect(updatedUser.name).toEqual(newName);
    });
  });
});
