import { IGcmCarBrandDetailParams, IGcmCarBrandListParams } from '@interfaces/gcmCarBrand'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetCarBrand, apiGetCarBrandDetail } from './api'

// Get CarBrand
export const useGetCarBrand = (params: IGcmCarBrandListParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/carBrand/list', params],
    queryFn: async () =>
      apiGetCarBrand(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get CarBrand Detail
export const useGetCarBrandDetail = (params: IGcmCarBrandDetailParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/carBrand/detail', params],
    queryFn: async () =>
      apiGetCarBrandDetail(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
