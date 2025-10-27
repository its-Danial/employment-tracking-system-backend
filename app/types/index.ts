// This file contains global utility types used across the codebase

export type ObjectValues<T> = T[keyof T]
export type ObjectKeys<T> = keyof T

export interface PaginatedResponseMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: `/?page=${number}`
  lastPageUrl: `/?page=${number}`
  nextPageUrl: `/?page=${number}` | null
  previousPageUrl: `/?page=${number}` | null
}

export interface SuccessResponse<T> {
  message: string
  data: T
  meta?: PaginatedResponseMeta | Record<string, unknown>
}
