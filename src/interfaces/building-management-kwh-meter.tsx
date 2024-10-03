import { IPaginationParams, ISearchParams } from './api'

export interface IBuildingManagementKWHMeterList {
  noId: number
  requestor: string
  location: string
  area: string
  descSp: string
  kwhMeterExisting: number
  kwhMeterRequest: number
  dateRequest: string
}

export interface IBuildingManagementKWHMeterDetail {
  noId: number
  requestor: string
  location: string
  area: string
  descSp: string
  kwhMeterExisting: number
  kwhMeterRequest: number
  dateRequest: string
  lastUpdateDate: string
}

export interface IBuildingManagementKWHMeterListParams extends ISearchParams, IPaginationParams {}

export interface IBuildingManagementKWHMeterDetailParams {
  noId: string
}
