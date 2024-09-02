import { IGcmCarFuelDetailParams, IGcmCarFuelListParams } from '@interfaces/gcmCarFuel'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetCarFuel, apiGetCarFuelDetail } from './api'

// Get CarFuel
export const useGetCarFuel = (params: IGcmCarFuelListParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/carFuel/list', params],
    queryFn: async () =>
      apiGetCarFuel(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get CarFuel Detail
export const useGetCarFuelDetail = (params: IGcmCarFuelDetailParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/carFuel/detail', params],
    queryFn: async () =>
      apiGetCarFuelDetail(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
