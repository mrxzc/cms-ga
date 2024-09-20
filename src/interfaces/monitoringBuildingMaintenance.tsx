import { IPaginationParams, ISearchParams } from './api'

export interface IMonitoringBuildingMaintenanceList {
  noId: number
  requestor: string
  location: string
  area: string
  costEstimasi: number
  requestDesc: string
  dtAdded: string
}

export interface IMonitoringBuildingMaintenanceDetail {
  noId: number
  dateRequest: string
  requestor: string
  location: string
  area: string
  costEstimasi: number
  requestDesc: string
  submissionPathFile: string
  dtAdded: string
}

export interface IGetListBuildingMaintenanceParams extends IPaginationParams, ISearchParams {
  startDate: string
  endDate: string
}

export interface IGetDetailBuildingMaintenanceParams {
  noId: string
}
