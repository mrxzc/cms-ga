import {
  IGcmRoomFacilityCreatePayload,
  IGcmRoomFacilityDeletePayload,
  IGcmRoomFacilityToggleStatusPayload,
  IGcmRoomFacilityUpdatePayload,
} from '@interfaces/gcmRoomFacility'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiCreateRoomFacility, apiDeleteRoomFacility, apiToggleStatusRoomFacility, apiUpdateRoomFacility } from './api'

// Create RoomFacility
export const mutateCreateRoomFacility = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmRoomFacilityCreatePayload; idUser: string }) =>
      apiCreateRoomFacility(payload, idUser),
    onSuccess: () => {
      toast.success('Tambah lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah lantai ruangan gagal, silahkan coba lagi')
    },
  })
}

// Update RoomFacility
export const mutateUpdateRoomFacility = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmRoomFacilityUpdatePayload; idUser: string }) =>
      apiUpdateRoomFacility(payload, idUser),
    onSuccess: () => {
      toast.success('Update lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update lantai ruangan gagal, silahkan coba lagi')
    },
  })
}

// Toggle Status RoomFacility
export const mutateToggleStatusRoomFacility = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmRoomFacilityToggleStatusPayload; idUser: string }) =>
      apiToggleStatusRoomFacility(payload, idUser),
    onSuccess: () => {
      toast.success('Update status lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update status lantai ruangan gagal, silahkan coba lagi')
    },
  })
}

// Delete RoomFacility
export const mutateDeleteRoomFacility = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmRoomFacilityDeletePayload; idUser: string }) =>
      apiDeleteRoomFacility(payload, idUser),
    onSuccess: () => {
      toast.success('Delete lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete lantai ruangan gagal, silahkan coba lagi')
    },
  })
}
