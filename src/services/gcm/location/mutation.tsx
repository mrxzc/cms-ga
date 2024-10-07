import {
  IGcmLocationCreatePayload,
  IGcmLocationDeletePayload,
  IGcmLocationToggleStatusPayload,
  IGcmLocationUpdatePayload,
} from '@interfaces/gcmLocation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiCreateLocation, apiDeleteLocation, apiToggleStatusLocation, apiUpdateLocation } from './api'

// Create Location
export const useMutateCreateLocation = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmLocationCreatePayload }) => apiCreateLocation(payload),
    onSuccess: () => {
      toast.success('Tambah lokasi berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah lokasi gagal, silahkan coba lagi')
    },
  })
}

// Update Location
export const useMutateUpdateLocation = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmLocationUpdatePayload }) => apiUpdateLocation(payload),
    onSuccess: () => {
      toast.success('Update lokasi berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update lokasi gagal, silahkan coba lagi')
    },
  })
}

// Toggle Status Location
export const useMutateToggleStatusLocation = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmLocationToggleStatusPayload }) => apiToggleStatusLocation(payload),
    onSuccess: () => {
      toast.success('Update status lokasi berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update status lokasi gagal, silahkan coba lagi')
    },
  })
}

// Delete Location
export const useMutateDeleteLocation = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmLocationDeletePayload }) => apiDeleteLocation(payload),
    onSuccess: () => {
      toast.success('Delete lokasi berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete lokasi gagal, silahkan coba lagi')
    },
  })
}
