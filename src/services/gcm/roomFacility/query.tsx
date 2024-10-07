import { IGcmRoomFacilityDetailParams, IGcmRoomFacilityListParams } from '@interfaces/gcmRoomFacility'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetRoomFacility, apiGetRoomFacilityDetail } from './api'

// Get RoomFacility
export const useGetRoomFacility = (params: IGcmRoomFacilityListParams) => {
  return useQuery({
    queryKey: ['/cms/master/roomFacility/list', params],
    queryFn: async () =>
      apiGetRoomFacility(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get RoomFacility Detail
export const useGetRoomFacilityDetail = (params: IGcmRoomFacilityDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/roomFacility/detail', params],
    queryFn: async () =>
      apiGetRoomFacilityDetail(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
