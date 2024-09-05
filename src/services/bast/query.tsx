import { IDetailBastInParams, IDetailBastOutParams, IListBastParams } from '@interfaces/bast'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailBastIn, apiGetDetailBastOut, apiGetListBast } from './api'

// Get List Bast
export const useGetListBast = (params: IListBastParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/bast/list', params],
    queryFn: async () =>
      apiGetListBast(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Detail Bast In
export const useGetDetailBastIn = (params: IDetailBastInParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/bast/detail/in', params],
    queryFn: async () =>
      apiGetDetailBastIn(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Detail Bast Out
export const useGetDetailBastOut = (params: IDetailBastOutParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/bast/detail/out', params],
    queryFn: async () =>
      apiGetDetailBastOut(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
