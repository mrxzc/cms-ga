import {
  IGcmRoomFloorCreatePayload,
  IGcmRoomFloorDeletePayload,
  IGcmRoomFloorToggleStatusPayload,
  IGcmRoomFloorUpdatePayload,
} from '@interfaces/gcmRoomFloor'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiCreateRoomFloor, apiDeleteRoomFloor, apiToggleStatusRoomFloor, apiUpdateRoomFloor } from './api'

// Create RoomFloor
export const useMutateCreateRoomFloor = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmRoomFloorCreatePayload; idUser: string }) =>
      apiCreateRoomFloor(payload, idUser),
    onSuccess: () => {
      toast.success('Tambah lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah lantai ruangan gagal, silahkan coba lagi')
    },
  })
}

// Update RoomFloor
export const useMutateUpdateRoomFloor = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmRoomFloorUpdatePayload; idUser: string }) =>
      apiUpdateRoomFloor(payload, idUser),
    onSuccess: () => {
      toast.success('Update lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update lantai ruangan gagal, silahkan coba lagi')
    },
  })
}

// Toggle Status RoomFloor
export const useMutateToggleStatusRoomFloor = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmRoomFloorToggleStatusPayload; idUser: string }) =>
      apiToggleStatusRoomFloor(payload, idUser),
    onSuccess: () => {
      toast.success('Update status lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update status lantai ruangan gagal, silahkan coba lagi')
    },
  })
}

// Delete RoomFloor
export const useMutateDeleteRoomFloor = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmRoomFloorDeletePayload; idUser: string }) =>
      apiDeleteRoomFloor(payload, idUser),
    onSuccess: () => {
      toast.success('Delete lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete lantai ruangan gagal, silahkan coba lagi')
    },
  })
}
