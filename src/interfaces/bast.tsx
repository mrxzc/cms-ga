import { IPaginationParams, ISearchParams } from './api'

export interface IListBastParams extends ISearchParams, IPaginationParams {
  categoryForm: string | null | undefined
  startDate?: string
  endDate?: string
}

export interface IDetailBastInParams {
  noIdSecurity: string | null | undefined
}

export interface IDetailBastOutParams {
  noIdSecurity: string | null | undefined
}
