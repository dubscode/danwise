import { describe, expect, it } from 'vitest';

import { UserModel } from './user';

// import { faker } from '@faker-js/faker';

describe('User', () => {
  describe('listUsers', () => {
    it('should return no users', async () => {
      const users = await UserModel.listUsers();
      expect(users).toEqual([]);
    });
  });
});
