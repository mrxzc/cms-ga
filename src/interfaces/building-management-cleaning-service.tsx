import { IPaginationParams, ISearchParams } from './api'

export interface IBuildingManagementCleaningServiceList {
  noId: number
  requestor: string
  location: string
  area: string
  descSp: string
  kategoriRequest: string
  dateRequest: string
}

export interface IBuildingManagementCleaningServiceDetail {
  noId: number
  dateRequest: string
  requestor: string
  location: string
  area: string
  descSp: string
  kategoriRequest: string
  nameManpowerExisting: string
  lamaKerja: number
  reason: string
}

export interface IBuildingManagementCleaningServiceListParams extends ISearchParams, IPaginationParams {}

export interface IBuildingManagementCleaningServiceDetailParams {
  noId: string
}
