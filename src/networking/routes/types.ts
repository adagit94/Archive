import type { Methods, MethodWithoutBody } from "networking/client/http/httpMethods";
import type { SchemaConstraint } from "schemas/types";
import type { GenRecord } from "types";

type GenSchemasConstraint<Keys extends string> = GenRecord<Keys, SchemaConstraint>;

type RouteMethodSchemaKey = "req" | "res" | "query";

type RouteMethodConstraint<SchemasKeys extends RouteMethodSchemaKey = RouteMethodSchemaKey> = {
  handler: (...args: unknown[]) => unknown;
  schemas: GenSchemasConstraint<SchemasKeys>;
};

export type RouteMethodsConstraint = {
  [Method in keyof Methods]: Method extends MethodWithoutBody
    ? RouteMethodConstraint<Exclude<RouteMethodSchemaKey, "req">>
    : RouteMethodConstraint;
};

export type RouteConstraint = {
  path: (...segments: string[]) => string
  schemas: GenSchemasConstraint<"path">;
  methods: Partial<RouteMethodsConstraint>;
};

export type RoutesConstraint = Record<string, RouteConstraint>;
