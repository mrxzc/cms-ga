import { IListContentParams } from '@interfaces/gcmContent'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetListContent } from './api'

// Get List Content
export const useGetListContent = (params: IListContentParams) => {
  return useQuery({
    queryKey: ['/cms/master/konten/list', params],
    queryFn: async () =>
      apiGetListContent(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
