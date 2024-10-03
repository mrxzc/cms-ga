import { IPaginationParams, ISearchParams } from './api'

export interface IBuildingManagementFuelList {
  noId: number
  requestor: string
  location: string
  area: string
  descSp: string
  bbmExisting: number
  bbmRequest: number
  dateRequest: string
}

export interface IBuildingManagementFuelDetail {
  noId: number
  requestor: string
  location: string
  area: string
  descSp: string
  bbmExisting: number
  bbmRequest: number
  dateRequest: string
  lastUpdateDate: string
}

export interface IBuildingManagementFuelListParams extends ISearchParams, IPaginationParams {}

export interface IBuildingManagementFuelDetailParams {
  noId: string
}
