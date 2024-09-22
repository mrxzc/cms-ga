import { ISearchParams } from '@interfaces/api'
import { IGetDetailManpowerParams, IGetListManpowerParams } from '@interfaces/monitoringManpower'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailManpower, apiGetListManpower } from './api'
import { ManpowerCategoryClassEnum, ManpowerMonitoringStatusClassEnum } from './enums'

// Get List Manpower
export const useGetListManpower = (params: IGetListManpowerParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/manpower/list', params],
    queryFn: async () =>
      apiGetListManpower(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Detail Manpower
export const useGetDetailManpower = (params: IGetDetailManpowerParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/manpower/detail', params],
    queryFn: async () =>
      apiGetDetailManpower(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get List Manpower Monitoring Status
export const useGetListManpowerMonitoringStatus = (params: ISearchParams) => {
  const monitoringStatus = new ManpowerMonitoringStatusClassEnum()

  return useQuery({
    queryKey: ['/cms/master/monitoring/manpower/status', params],
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

// Get List Manpower Category
export const useGetListManpowerCategory = (params: ISearchParams) => {
  const category = new ManpowerCategoryClassEnum()

  return useQuery({
    queryKey: ['/cms/master/monitoring/manpower/category', params],
    queryFn: async () => {
      return new Promise(function (resolve) {
        setTimeout(() => {
          // reject(new Error('failed fetch'))
          resolve(params?.search ? category.search(params?.search) : category.enums)
        }, 100)
      })
    },
  })
}
