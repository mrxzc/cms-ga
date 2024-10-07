import { IGcmRoomFloorDetailParams, IGcmRoomFloorListParams } from '@interfaces/gcmRoomFloor'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetRoomFloor, apiGetRoomFloorDetail } from './api'

// Get RoomFloor
export const useGetRoomFloor = (params: IGcmRoomFloorListParams) => {
  return useQuery({
    queryKey: ['/cms/master/roomFloor/list', params],
    queryFn: async () =>
      apiGetRoomFloor(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get RoomFloor Detail
export const useGetRoomFloorDetail = (params: IGcmRoomFloorDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/roomFloor/detail', params],
    queryFn: async () =>
      apiGetRoomFloorDetail(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
