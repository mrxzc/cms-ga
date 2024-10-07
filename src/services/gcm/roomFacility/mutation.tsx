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
export const useMutateCreateRoomFacility = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmRoomFacilityCreatePayload }) => apiCreateRoomFacility(payload),
    onSuccess: () => {
      toast.success('Tambah lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah lantai ruangan gagal, silahkan coba lagi')
    },
  })
}

// Update RoomFacility
export const useMutateUpdateRoomFacility = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmRoomFacilityUpdatePayload }) => apiUpdateRoomFacility(payload),
    onSuccess: () => {
      toast.success('Update lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update lantai ruangan gagal, silahkan coba lagi')
    },
  })
}

// Toggle Status RoomFacility
export const useMutateToggleStatusRoomFacility = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmRoomFacilityToggleStatusPayload }) =>
      apiToggleStatusRoomFacility(payload),
    onSuccess: () => {
      toast.success('Update status lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update status lantai ruangan gagal, silahkan coba lagi')
    },
  })
}

// Delete RoomFacility
export const useMutateDeleteRoomFacility = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmRoomFacilityDeletePayload }) => apiDeleteRoomFacility(payload),
    onSuccess: () => {
      toast.success('Delete lantai ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete lantai ruangan gagal, silahkan coba lagi')
    },
  })
}
