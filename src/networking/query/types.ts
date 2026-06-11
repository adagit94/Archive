import type { ComparisonOperation } from "operations/types"

type Select = string | string[] | { field: string, select: Select }

type Where = ComparisonOperation | ComparisonOperation[] | Partial<{
    AND: ComparisonOperation[],
    OR: ComparisonOperation[],
    NOT: ComparisonOperation[],
}>

type OrderBy = string | [string, "asc" | "desc"] | (string | [string, "asc" | "desc"])[]

type QueryConstraint = {
    collection: string
    select?: Select
    where?: Where
    orderBy?: OrderBy
    skip?: number
    take?: number
}

// type QueryResult<T extends QueryConstraint> = 

export type { QueryConstraint }