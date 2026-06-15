enum CRUD {
  C,
  R,
  U,
  D,
}

type LogicalOperator = "&&" | "||"

type StringInclusionOperator =
    "CONTAINS" |
    "CONTAINS CONTINUOUS" |
    "CONTAINS PARTIAL" |
    "CONTAINS CONTINUOUS PARTIAL" |
    "CONTAINS WORDS" |
    "CONTAINS WORDS CONTINUOUS" |
    "CONTAINS WORDS PARTIAL" |
    "CONTAINS WORDS CONTINUOUS PARTIAL" |
    "EXACT" |
    "STARTS WITH" |
    "STARTS WITH PARTIAL" |
    "ENDS WITH" |
    "ENDS WITH PARTIAL"

type NumberComparisonOperator =
    "=" |
    "!=" |
    ">" |
    ">=" |
    "<" |
    "<="

type DateComparisonOperator =
    "=" |
    "!=" |
    ">" |
    ">=" |
    "<" |
    "<="

type BooleanComparisonOperator = "=" | "!="

type NullComparisonOperator = "=" | "!="

type UnOperation<Operator, Operand> = [Operator, Operand]
type BiOperation<LeftOperand, Operator, RightOperand> = [LeftOperand, Operator, RightOperand]

type StringInclusionOperation<T extends string = string> = BiOperation<T, StringInclusionOperator, string>
type NumberComparisonOperation<T extends number = number> = BiOperation<T, NumberComparisonOperator, number>
type DateComparisonOperation<T extends string | number> = BiOperation<T, DateComparisonOperator, T>
type BooleanComparisonOperation<T extends boolean = boolean> = BiOperation<T, BooleanComparisonOperator, boolean>
type NullComparisonOperation<T> = BiOperation<T, NullComparisonOperator, null>

// type ComparisonOperation = StringInclusionOperation | NumberComparisonOperation | DateComparisonOperation | BooleanComparisonOperation | NullComparisonOperation

// export type { ComparisonOperation }