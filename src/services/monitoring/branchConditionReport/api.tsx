import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringBranchConditionReportList,
  IMonitoringBranchConditionReportDetail,
  IGetListBranchConditionReportParams,
  IGetDetailBranchConditionReportParams,
} from '@interfaces/monitoringBranchConditionReport'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetDetailBranchConditionReport, dummyGetListBranchConditionReport } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListBranchConditionReport(
  params: IGetListBranchConditionReportParams
): Promise<APIBaseResponse<IMonitoringBranchConditionReportList[]>> {
  // return dummyGetListBranchConditionReport()

  return api.get<IMonitoringBranchConditionReportList[], APIBaseResponse<IMonitoringBranchConditionReportList[]>>(
    '/cms/master/monitoring/branchReport/list',
    {
      params,
    }
  )
}

export function apiGetDetailBranchConditionReport(
  params: IGetDetailBranchConditionReportParams
): Promise<APIBaseResponse<IMonitoringBranchConditionReportDetail>> {
  // return dummyGetDetailBranchConditionReport()

  return api.get<IMonitoringBranchConditionReportDetail, APIBaseResponse<IMonitoringBranchConditionReportDetail>>(
    '/cms/master/monitoring/branchReport/detail',
    {
      params,
    }
  )
}
