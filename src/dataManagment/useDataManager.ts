import { useCallback, useState } from "react"

import { DataManagerLoader, DataManagerSettings } from "./DataManagerTypes"

export function useDataManager<T, U extends DataManagerLoader<T>>({
  loader,
}: DataManagerSettings<T, U>) {
  const [items, setItems] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const refreshItems = useCallback(
    async (...params: Parameters<U>) => {
      setIsLoading(true)

      try {
        const items = await loader(...params)

        items && setItems(items)
      } catch (err) {
        console.error(`Data manager error: `, err)
      }

      setIsLoading(false)
    },
    [loader]
  )

  const clear = useCallback(() => setItems([]), [])

  return { items, isLoading, refreshItems, clear }
}
