import { UserModel } from '@danwise/core/models/user';
import { builder } from '../builder';

const UserType = builder.objectRef<UserModel.UserType>('User').implement({
  description: 'User record from the database.',
  fields: (t) => ({
    id: t.exposeID('id'),
    clerkId: t.exposeID('clerkId'),
    email: t.exposeString('email'),
    name: t.exposeString('name'),
    created: t.field({
      type: 'DateTime',
      resolve: (user) => new Date(user.created!),
    }),
    updated: t.field({
      type: 'DateTime',
      resolve: (user) => new Date(user.updated!),
    }),
  }),
});

builder.queryFields((t) => ({
  users: t.field({
    type: [UserType],
    resolve: async (_parent, _args, _context, _info) => {
      return await UserModel.listUsers();
    },
  }),
}));

builder.mutationFields((t) => ({
  createUser: t.field({
    type: UserType,
    args: {
      clerkId: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      name: t.arg.string(),
    },
    resolve: (_, args) => {
      return UserModel.createUser(args);
    },
  }),
}));
