import { IPaginationParams, ISearchParams } from './api'

export interface IMonitoringBranchConditionReportList {
  noId: number
  requestor: string
  location: string
  area: string
  dtAdded: string
}

export interface IMonitoringBranchConditionReportDetail {
  noId: number
  requestor: string
  location: string
  area: string
  requestDesc: string
  dtAdded: string
}

export interface IGetListBranchConditionReportParams extends IPaginationParams, ISearchParams {
  startDate: string
  endDate: string
}

export interface IGetDetailBranchConditionReportParams {
  noIdBooking: string
}
