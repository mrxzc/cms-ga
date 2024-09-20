import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailBranchConditionReport, apiGetListBranchConditionReport } from './api'
import {
  IGetListBranchConditionReportParams,
  IGetDetailBranchConditionReportParams,
} from '@interfaces/monitoringBranchConditionReport'

// Get List Branch Condition Report
export const useGetListBranchConditionReport = (params: IGetListBranchConditionReportParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/branchReport/list', params],
    queryFn: async () =>
      apiGetListBranchConditionReport(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Detail Branch Condition Report
export const useGetDetailBranchConditionReport = (params: IGetDetailBranchConditionReportParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/branchReport/detail', params],
    queryFn: async () =>
      apiGetDetailBranchConditionReport(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
