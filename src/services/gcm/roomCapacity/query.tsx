import { IGcmRoomCapacityDetailParams, IGcmRoomCapacityListParams } from '@interfaces/gcmRoomCapacity'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetRoomCapacity, apiGetRoomCapacityDetail } from './api'

// Get RoomCapacity
export const useGetRoomCapacity = (params: IGcmRoomCapacityListParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/roomCapacity/list', params],
    queryFn: async () =>
      apiGetRoomCapacity(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get RoomCapacity Detail
export const useGetRoomCapacityDetail = (params: IGcmRoomCapacityDetailParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/roomCapacity/detail', params],
    queryFn: async () =>
      apiGetRoomCapacityDetail(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
