import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailMeetingRoom, apiGetListMeetingRoom } from './api'
import { IGetListMeetingRoomParams, IGetDetailMeetingRoomParams } from '@interfaces/monitoringMeetingRoom'

// Get List Meeting Room
export const useGetListMeetingRoom = (params: IGetListMeetingRoomParams, reduceParams: boolean = true) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/meetingRoom/list', params],
    queryFn: async () => {
      if (reduceParams) {
        Object.keys(params).forEach(key => {
          if (!params[key as keyof IGetListMeetingRoomParams]) {
            delete params[key as keyof IGetListMeetingRoomParams]
          }
        })
      }

      return apiGetListMeetingRoom(params).catch((error: Error) => {
        toast.error(error?.message)
      })
    },
  })
}

// Get Detail Meeting Room
export const useGetDetailMeetingRoom = (params: IGetDetailMeetingRoomParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/meetingRoom/detail', params],
    queryFn: async () =>
      apiGetDetailMeetingRoom(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
