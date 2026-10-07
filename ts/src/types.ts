export type PrimitiveValue = string | number | boolean;

export type Variadic<T, U extends unknown[] = []> = (...args: U) => T;

export type ImmutableGetter<T> = () => Readonly<T>;

export type ConversionRecursive<Obj extends object, ValueType> = {
  [k in keyof Obj]: Obj[k] extends object ? ConversionRecursive<Obj[k], ValueType> : ValueType;
};

export type UnionValues<Obj extends object, ValueType> = {
  [k in keyof Obj]: Obj[k] | ValueType;
};

export type UnionValuesRecursive<Obj extends object, ValueType> = {
  [k in keyof Obj]: Obj[k] extends object ? ConversionRecursive<Obj[k], ValueType> : Obj[k] | ValueType;
};

export type PartialRecursive<Obj extends object> = Partial<{
  [k in keyof Obj]: Obj[k] extends object ? PartialRecursive<Obj[k]> : Obj[k];
}>;

export type RecursiveAssignment<T extends Record<PropertyKey, unknown>, U extends Record<PropertyKey, unknown>> = {
  [K in keyof Pick<T, keyof U>]: T[K] extends Record<PropertyKey, unknown>
    ? U[K] extends Record<PropertyKey, unknown>
      ? RecursiveAssignment<T[K], U[K]>
      : U[K]
    : U[K];
} & Omit<T, keyof U> &
  Omit<U, keyof T>;

/**
@description
A utility type that converts specific properties (some or all) of first record to value types defined in second one.

@example
type Rec = RecordConversion<{ a: number; b: string }, { b: number }> // { a: number; b: number }
*/
export type RecordConversion<T extends Record<PropertyKey, unknown>, U extends { [K in keyof T]?: unknown }> = Omit<
  T,
  keyof U
> &
  U;

export type GenRecord<Keys extends PropertyKey, Value> = { [K in Keys]: Value };

/**
@description
A utility type that makes just specific properties of record optional in case they aren't already.

@example
type Rec = RecordOptionals<{ a: number; b: string }, "b"> // { a: number; b?: string }
*/
export type RecordOptionals<R extends Record<PropertyKey, unknown>, Ks extends keyof R> = Omit<R, Ks> &
  Partial<Pick<R, Ks>>;

/**
@description
A utility type that makes just specific properties of record required (non-optional) in case they aren't already.

@example
type Rec = RecordRequired<{ a?: number; b?: string }, "b"> // { a?: number; b: string }
*/
export type RecordRequired<R extends Record<PropertyKey, unknown>, Ks extends keyof R> = Omit<R, Ks> &
  Required<Pick<R, Ks>>

type SafeResultSuccess<T> = {
  success: true;
  data: T;
};

type SafeResultFailure<T> = {
  success: false;
  error: T;
};

export type SafeResult<T, U = Error> = SafeResultSuccess<T> | SafeResultFailure<U>;

export type SafeTuple<T, U = unknown> = [T, null] | [null, U];

// SP (Singular/Plural)
export type SP<T> = T | T[];
