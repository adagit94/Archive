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

type StringInclusionOperation = BiOperation<string, StringInclusionOperator, string>
type NumberComparisonOperation = BiOperation<string, NumberComparisonOperator, number>
type DateComparisonOperation = BiOperation<string, DateComparisonOperator, string | number>
type BooleanComparisonOperation = BiOperation<string, BooleanComparisonOperator, boolean>
type NullComparisonOperation = BiOperation<string, NullComparisonOperator, null>

type ComparisonOperation = StringInclusionOperation | NumberComparisonOperation | DateComparisonOperation | BooleanComparisonOperation | NullComparisonOperation

export type { ComparisonOperation }