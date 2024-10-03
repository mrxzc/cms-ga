import { IPaginationParams, ISearchParams } from './api'

export interface IBuildingManagementSecurityGuardList {
  noId: number
  requestor: string
  location: string
  area: string
  descSp: string
  kategoriRequest: string
  dateRequest: string
}

export interface IBuildingManagementSecurityGuardDetail {
  noId: number
  dateRequest: string
  requestor: string
  location: string
  area: string
  descSp: string
  kategoriRequest: string
  lamaKerja: number
  reason: string
}

export interface IBuildingManagementSecurityGuardListParams extends ISearchParams, IPaginationParams {}

export interface IBuildingManagementSecurityGuardDetailParams {
  noId: string
}
