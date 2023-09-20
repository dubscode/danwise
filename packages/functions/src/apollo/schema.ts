import './defs/user';

import type { GraphQLSchema } from 'graphql';
import { builder } from './builder';

export const schema: GraphQLSchema = builder.toSchema({});
