import { IPaginationParams, ISearchParams } from './api'

export interface IBuildingManagementWaterMeterList {
  noId: number
  requestor: string
  location: string
  area: string
  descSp: string
  waterMeterExisting: number
  waterMeterRequest: number
  dateRequest: string
}

export interface IBuildingManagementWaterMeterDetail {
  noId: number
  requestor: string
  location: string
  area: string
  descSp: string
  waterMeterExisting: number
  waterMeterRequest: number
  dateRequest: string
  lastUpdateDate: string
}

export interface IBuildingManagementWaterMeterListParams extends ISearchParams, IPaginationParams {}

export interface IBuildingManagementWaterMeterDetailParams {
  noId: string
}
