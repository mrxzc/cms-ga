import { IGcmCarYearDetailParams, IGcmCarYearListParams } from '@interfaces/gcmCarYear'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetCarYear, apiGetCarYearDetail } from './api'

// Get CarYear
export const useGetCarYear = (params: IGcmCarYearListParams) => {
  return useQuery({
    queryKey: ['/cms/master/carYear/list', params],
    queryFn: async () =>
      apiGetCarYear(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get CarYear Detail
export const useGetCarYearDetail = (params: IGcmCarYearDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/carYear/detail', params],
    queryFn: async () =>
      apiGetCarYearDetail(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
