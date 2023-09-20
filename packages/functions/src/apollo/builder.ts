import {
  DateResolver,
  DateTimeResolver,
  JSONResolver,
  ObjectIDResolver,
  PhoneNumberResolver,
  URLResolver,
} from 'graphql-scalars';

import SchemaBuilder from '@pothos/core';

export const builder = new SchemaBuilder<{
  Context: {};
  DefaultFieldNullability: true;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    DateTime: {
      Input: Date;
      Output: Date;
    };
    ID: {
      Input: string;
      Output: unknown;
    };
    JSON: {
      Input: unknown;
      Output: unknown;
    };
    PhoneNumber: {
      Input: string;
      Output: string;
    };
    URL: {
      Input: string;
      Output: string;
    };
  };
}>({
  defaultFieldNullability: true,
});

builder.queryType({});
builder.mutationType({});
builder.addScalarType('Date', DateResolver, {});
builder.addScalarType('DateTime', DateTimeResolver, {});
builder.addScalarType('ID', ObjectIDResolver, {});
builder.addScalarType('JSON', JSONResolver, {});
builder.addScalarType('PhoneNumber', PhoneNumberResolver, {});
builder.addScalarType('URL', URLResolver, {});
