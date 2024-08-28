// Queries

import { IRoomDetailParams, IRoomListParams } from '@interfaces/room'
import { apiGetDetailRoom, apiGetListRoom } from './api'
import { useQuery } from '@tanstack/react-query'

// Mendapatkan detail ruangan
export const useGetRoomDetail = (params: IRoomDetailParams) => {
  return useQuery({
    queryKey: ['cms/master/room/detail', params],
    queryFn: async () => apiGetDetailRoom(params),
    enabled: true,
    staleTime: 5000,
  })
}

// Mendapatkan daftar ruangan
export const useGetRoomList = (params: IRoomListParams) => {
  return useQuery({
    queryKey: ['cms/master/room/list', params],
    queryFn: async () => apiGetListRoom(params),
    enabled: true,
    refetchOnWindowFocus: false,
  })
}
