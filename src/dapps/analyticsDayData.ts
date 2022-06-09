import { Network } from './network'

export type AnalyticsDayData = {
  id: string
  date: number
  sales: number
  volume: string
  creatorsEarnings: string
  daoEarnings: string
}

export type AnalyticsDayDataFilters = {
  from?: number
  network?: Network
}

export enum AnalyticsDayDataSortBy {
  DATE = 'date',
  MOST_SALES = 'most_sales'
}
