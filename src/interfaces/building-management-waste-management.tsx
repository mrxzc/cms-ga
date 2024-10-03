import { IPaginationParams, ISearchParams } from './api'

export interface IBuildingManagementWasteManagementList {
  noId: number
  requestor: string
  location: string
  area: string
  descSp: string
  beratSampahExisting: number
  beratSampahRequest: number
  dateRequest: string
}

export interface IBuildingManagementWasteManagementDetail {
  noId: number
  dateRequest: string
  requestor: string
  location: string
  area: string
  descSp: string
  beratSampahExisting: number
  beratSampahRequest: number
  lastUpdateDate: string
}

export interface IBuildingManagementWasteManagementListParams extends ISearchParams, IPaginationParams {}

export interface IBuildingManagementWasteManagementDetailParams {
  noId: string
}
