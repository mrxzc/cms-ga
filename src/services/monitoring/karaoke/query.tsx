import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailKaraoke, apiGetListKaraoke } from './api'
import { IGetListKaraokeParams, IGetDetailKaraokeParams } from '@interfaces/monitoringKaraoke'

// Get List Karaoke
export const useGetListKaraoke = (params: IGetListKaraokeParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/karaoke/list', params],
    queryFn: async () =>
      apiGetListKaraoke(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Detail Karaoke
export const useGetDetailKaraoke = (params: IGetDetailKaraokeParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/karaoke/detail', params],
    queryFn: async () =>
      apiGetDetailKaraoke(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
