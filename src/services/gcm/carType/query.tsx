import { IGcmCarTypeDetailParams, IGcmCarTypeListParams } from '@interfaces/gcmCarType'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetCarType, apiGetCarTypeDetail } from './api'

// Get CarType
export const useGetCarType = (params: IGcmCarTypeListParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/carType/list', params],
    queryFn: async () =>
      apiGetCarType(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get CarType Detail
export const useGetCarTypeDetail = (params: IGcmCarTypeDetailParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/carType/detail', params],
    queryFn: async () =>
      apiGetCarTypeDetail(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
