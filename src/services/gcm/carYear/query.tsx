import { IGcmCarYearDetailParams, IGcmCarYearListParams } from '@interfaces/gcmCarYear'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetCarYear, apiGetCarYearDetail } from './api'

// Get CarYear
export const useGetCarYear = (params: IGcmCarYearListParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/carYear/list', params],
    queryFn: async () =>
      apiGetCarYear(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get CarYear Detail
export const useGetCarYearDetail = (params: IGcmCarYearDetailParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/carYear/detail', params],
    queryFn: async () =>
      apiGetCarYearDetail(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
