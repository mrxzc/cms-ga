import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailPods, apiGetListPods } from './api'
import { IGetListPodsParams, IGetDetailPodsParams } from '@interfaces/monitoringPods'

// Get List Pods
export const useGetListPods = (params: IGetListPodsParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/pods/list', params],
    queryFn: async () =>
      apiGetListPods(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Detail Pods
export const useGetDetailPods = (params: IGetDetailPodsParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/pods/detail', params],
    queryFn: async () =>
      apiGetDetailPods(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
