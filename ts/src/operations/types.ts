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

type StringInclusionOperation<T> = BiOperation<T, StringInclusionOperator, string>
type NumberComparisonOperation<T> = BiOperation<T, NumberComparisonOperator, number>
type DateComparisonOperation<T, U extends string | number> = BiOperation<T, DateComparisonOperator, U>
type BooleanComparisonOperation<T = boolean> = BiOperation<T, BooleanComparisonOperator, boolean>
type NullComparisonOperation<T> = BiOperation<T, NullComparisonOperator, null>

export type { StringInclusionOperation, NumberComparisonOperation, DateComparisonOperation, BooleanComparisonOperation, NullComparisonOperation }