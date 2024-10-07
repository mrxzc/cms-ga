import { IGcmLocationDetailParams, IGcmLocationListParams } from '@interfaces/gcmLocation'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetLocation, apiGetLocationDetail } from './api'

// Get Location
export const useGetLocation = (params: IGcmLocationListParams) => {
  return useQuery({
    queryKey: ['/cms/master/location/list', params],
    queryFn: async () =>
      apiGetLocation(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Location Detail
export const useGetLocationDetail = (params: IGcmLocationDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/location/detail', params],
    queryFn: async () =>
      apiGetLocationDetail(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
