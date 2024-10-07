import {
  IGcmRoomCapacityCreatePayload,
  IGcmRoomCapacityDeletePayload,
  IGcmRoomCapacityToggleStatusPayload,
  IGcmRoomCapacityUpdatePayload,
} from '@interfaces/gcmRoomCapacity'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiCreateRoomCapacity, apiDeleteRoomCapacity, apiToggleStatusRoomCapacity, apiUpdateRoomCapacity } from './api'

// Create RoomCapacity
export const useMutateCreateRoomCapacity = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmRoomCapacityCreatePayload }) => apiCreateRoomCapacity(payload),
    onSuccess: () => {
      toast.success('Tambah kapasitas ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah kapasitas ruangan gagal, silahkan coba lagi')
    },
  })
}

// Update RoomCapacity
export const useMutateUpdateRoomCapacity = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmRoomCapacityUpdatePayload }) => apiUpdateRoomCapacity(payload),
    onSuccess: () => {
      toast.success('Update kapasitas ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update kapasitas ruangan gagal, silahkan coba lagi')
    },
  })
}

// Toggle Status RoomCapacity
export const useMutateToggleStatusRoomCapacity = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmRoomCapacityToggleStatusPayload }) =>
      apiToggleStatusRoomCapacity(payload),
    onSuccess: () => {
      toast.success('Update status kapasitas ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update status kapasitas ruangan gagal, silahkan coba lagi')
    },
  })
}

// Delete RoomCapacity
export const useMutateDeleteRoomCapacity = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmRoomCapacityDeletePayload }) => apiDeleteRoomCapacity(payload),
    onSuccess: () => {
      toast.success('Delete kapasitas ruangan berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete kapasitas ruangan gagal, silahkan coba lagi')
    },
  })
}
