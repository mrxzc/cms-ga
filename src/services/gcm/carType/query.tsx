import { IGcmCarTypeDetailParams, IGcmCarTypeListParams } from '@interfaces/gcmCarType'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetCarType, apiGetCarTypeDetail } from './api'

// Get CarType
export const useGetCarType = (params: IGcmCarTypeListParams) => {
  return useQuery({
    queryKey: ['/cms/master/carType/list', params],
    queryFn: async () =>
      apiGetCarType(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get CarType Detail
export const useGetCarTypeDetail = (params: IGcmCarTypeDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/carType/detail', params],
    queryFn: async () =>
      apiGetCarTypeDetail(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
