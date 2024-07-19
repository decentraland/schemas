export type PaginatedResponse<T> = {
  results: T[]
  total: number
  page: number
  pages: number
  limit: number
}

export type PaginatedParameters = {
  limit?: number
  offset?: number
}
