import { ISearchParams } from '@interfaces/api'
import { IGetDetailBallroomParams, IGetListBallroomParams } from '@interfaces/monitoringBallroom'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailBallroom, apiGetListBallroom } from './api'
import { BallroomMonitoringStatusClassEnum } from './enums'

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

// Get List Ballroom Monitoring Status
export const useGetListBallroomMonitoringStatus = (params: ISearchParams) => {
  const monitoringStatus = new BallroomMonitoringStatusClassEnum()

  return useQuery({
    queryKey: ['/cms/master/monitoring/ballroom/status', params],
    queryFn: async () => {
      return new Promise(function (resolve) {
        setTimeout(() => {
          // reject(new Error('failed fetch'))
          resolve(params?.search ? monitoringStatus.search(params?.search) : monitoringStatus.enums)
        }, 100)
      })
    },
  })
}
