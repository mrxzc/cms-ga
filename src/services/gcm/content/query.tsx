import { IListContentParams } from '@interfaces/gcmContent'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetListContent } from './api'

// Get List Content
export const useGetListContent = (params: IListContentParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/konten/list', params],
    queryFn: async () =>
      apiGetListContent(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
