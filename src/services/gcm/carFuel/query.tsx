import { IGcmCarFuelDetailParams, IGcmCarFuelListParams } from '@interfaces/gcmCarFuel'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetCarFuel, apiGetCarFuelDetail } from './api'

// Get CarFuel
export const useGetCarFuel = (params: IGcmCarFuelListParams) => {
  return useQuery({
    queryKey: ['/cms/master/carFuel/list', params],
    queryFn: async () =>
      apiGetCarFuel(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get CarFuel Detail
export const useGetCarFuelDetail = (params: IGcmCarFuelDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/carFuel/detail', params],
    queryFn: async () =>
      apiGetCarFuelDetail(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
