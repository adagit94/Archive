export type SchemaConstraint = (input: unknown) => unknown
export type Schema<T extends SchemaConstraint> = T
export type SchemaValue<T extends SchemaConstraint> = ReturnType<Schema<T>> // e.g. z.infer<T>
