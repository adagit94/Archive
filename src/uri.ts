import { PrimitiveValue } from "types.js"
import TypesUtils from "TypesUtils.js"

export const encodeUriVals = (vals: PrimitiveValue[]) => vals.map(encodeURIComponent)

export const encodeAndJoinUriVals = (vals: PrimitiveValue[], sep: string) =>
    encodeUriVals(vals).join(sep)

export const encodeAndJoinPathSegs = (segs: PrimitiveValue[]) => encodeAndJoinUriVals(segs, "/")

export const encodeAndJoinQueryParams = (params: PrimitiveValue[]) =>
    encodeAndJoinUriVals(params, ",")

export function composeQueryStr<T extends PrimitiveValue>(params: Record<string, T | T[]>): string
export function composeQueryStr<T>(
    params: Record<string, T>,
    processParam: (key: string, value: T) => string
): string
export function composeQueryStr<T>(
    params: Record<string, T>,
    processParam?: (key: string, value: T) => string
): string {
    let queryStr = Object.entries(params)
        .map(([key, val]) => {
            let processedParam = ""

            if (processParam) {
                processedParam = processParam(key, val)
            } else {
                const arr = Array.isArray(val) ? val : [val]

                if (TypesUtils.containsOnlyPrimitives(arr)) {
                    processedParam = encodeAndJoinQueryParams(arr)
                }
            }

            return `${key}=${processedParam}`
        })
        .join("&")

    if (queryStr.length > 0) {
        queryStr = `?${queryStr}`
    }

    return queryStr
}
