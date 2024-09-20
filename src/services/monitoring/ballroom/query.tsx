import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailBallroom, apiGetListBallroom } from './api'
import { IGetListBallroomParams, IGetDetailBallroomParams } from '@interfaces/monitoringBallroom'

// Get List Ballroom
export const useGetListBallroom = (params: IGetListBallroomParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/ballroom/list', params],
    queryFn: async () =>
      apiGetListBallroom(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Detail Ballroom
export const useGetDetailBallroom = (params: IGetDetailBallroomParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/ballroom/detail', params],
    queryFn: async () =>
      apiGetDetailBallroom(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
