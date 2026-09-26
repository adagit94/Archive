export type DataManagerLoader<T> = (...params: any[]) => Promise<T[] | void>

export type CommonDataManagerSettings<T, U extends DataManagerLoader<T>> = {
  loader: U
}

export type DataManagerSettings<
  T,
  U extends DataManagerLoader<T>
> = CommonDataManagerSettings<T, U>

export type LazyDataManagerSettings<
  T,
  U extends DataManagerLoader<T>
> = CommonDataManagerSettings<T, U> & {
  limit: number
}

export type LazyDataManagerValues = { page: number }
