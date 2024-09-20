import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailManpower, apiGetListManpower } from './api'
import { IGetListManpowerParams, IGetDetailManpowerParams } from '@interfaces/monitoringManpower'

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
