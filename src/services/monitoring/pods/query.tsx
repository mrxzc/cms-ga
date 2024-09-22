import { ISearchParams } from '@interfaces/api'
import { IGetDetailPodsParams, IGetListPodsParams } from '@interfaces/monitoringPods'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailPods, apiGetListPods } from './api'
import { PodsMonitoringStatusClassEnum } from './enums'

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

// Get List Pods Monitoring Status
export const useGetListPodsMonitoringStatus = (params: ISearchParams) => {
  const monitoringStatus = new PodsMonitoringStatusClassEnum()

  return useQuery({
    queryKey: ['/cms/master/monitoring/pods/status', params],
    queryFn: async () => {
      return new Promise(function (resolve) {
        setTimeout(() => {
          // reject(new Error('failed fetch'))
          resolve(params?.search ? monitoringStatus.search(params?.search) : monitoringStatus.enums)
        }, 100)
      })
    },
  })
}
