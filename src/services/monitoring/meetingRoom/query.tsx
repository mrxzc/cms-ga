import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailMeetingRoom, apiGetListMeetingRoom } from './api'
import { IGetListMeetingRoomParams, IGetDetailMeetingRoomParams } from '@interfaces/monitoringMeetingRoom'
import { ISearchParams } from '@interfaces/api'
import { MeetingRoomMonitoringStatusClassEnum } from './enums'

// Get List Meeting Room
export const useGetListMeetingRoom = (params: IGetListMeetingRoomParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/meetingRoom/list', params],
    queryFn: async () => {
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

// Get List Meeting Room Monitoring Status
export const useGetListMeetingRoomMonitoringStatus = (params: ISearchParams) => {
  const monitoringStatus = new MeetingRoomMonitoringStatusClassEnum()

  return useQuery({
    queryKey: ['/cms/master/monitoring/meetingRoom/status', params],
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
