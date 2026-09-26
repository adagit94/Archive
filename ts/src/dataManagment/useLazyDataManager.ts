import { useCallback, useEffect, useRef, useState } from "react"

import {
  DataManagerLoader,
  LazyDataManagerSettings,
  LazyDataManagerValues,
} from "./DataManagerTypes"

export function useLazyDataManager<T, U extends DataManagerLoader<T>>({
  limit,
  loader,
}: LazyDataManagerSettings<T, U>) {
  const [items, setItems] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const valuesRef = useRef<LazyDataManagerValues>({ page: 1 })

  const refreshItems = useCallback(
    async (...params: Parameters<U>) => {
      setIsLoading(true)

      try {
        const items = await loader(...params)

        if (items) {
          valuesRef.current.page++
          setItems((s) => [...s, ...items])
        }
      } catch (err) {
        console.error(`Data manager error: `, err)
      }

      setIsLoading(false)
    },
    [loader]
  )

  const clear = useCallback(() => {
    valuesRef.current.page = 1
    setItems([])
  }, [])

  useEffect(() => {
    clear()
  }, [limit, clear])

  return { items, isLoading, refreshItems, clear }
}
