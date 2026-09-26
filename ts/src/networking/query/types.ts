import type { BooleanComparisonOperation, DateComparisonOperation, NullComparisonOperation, NumberComparisonOperation, StringInclusionOperation } from "operations/types"

type Select = string | string[] | { field: string, select: Select }

type ComparisonOperation = StringInclusionOperation<string> | NumberComparisonOperation<string> | DateComparisonOperation<string, string | number> | BooleanComparisonOperation<string> | NullComparisonOperation<string>

type Where = ComparisonOperation | ComparisonOperation[] | Partial<{
    AND: ComparisonOperation[],
    OR: ComparisonOperation[],
    NOT: ComparisonOperation[],
}>

type OrderBy = string | [string, "asc" | "desc"] | (string | [string, "asc" | "desc"])[]

enum PagingType {
    Offset,
    Cursor,
}

type OffsetPaging = {
    type: PagingType.Offset,

} & ({
    skip: number
} | {
    take: number
} | {
    skip: number
    take: number
})

type CursorPaging = {
    type: PagingType.Cursor,
}

type Paging = OffsetPaging | CursorPaging

type QueryConstraint = {
    collection: string
    select?: Select
    where?: Where
    orderBy?: OrderBy
    paging?: Paging
}

export type { QueryConstraint }