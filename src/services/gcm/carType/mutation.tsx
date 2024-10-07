import {
  IGcmCarTypeCreatePayload,
  IGcmCarTypeDeletePayload,
  IGcmCarTypeToggleStatusPayload,
  IGcmCarTypeUpdatePayload,
} from '@interfaces/gcmCarType'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiCreateCarType, apiDeleteCarType, apiToggleStatusCarType, apiUpdateCarType } from './api'

// Create CarType
export const useMutateCreateCarType = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmCarTypeCreatePayload }) => apiCreateCarType(payload),
    onSuccess: () => {
      toast.success('Tambah tipe mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah tipe mobil gagal, silahkan coba lagi')
    },
  })
}

// Update CarType
export const useMutateUpdateCarType = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmCarTypeUpdatePayload }) => apiUpdateCarType(payload),
    onSuccess: () => {
      toast.success('Update tipe mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update tipe mobil gagal, silahkan coba lagi')
    },
  })
}

// Toggle Status CarType
export const useMutateToggleStatusCarType = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmCarTypeToggleStatusPayload }) => apiToggleStatusCarType(payload),
    onSuccess: () => {
      toast.success('Update status tipe mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update status tipe mobil gagal, silahkan coba lagi')
    },
  })
}

// Delete CarType
export const useMutateDeleteCarType = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmCarTypeDeletePayload }) => apiDeleteCarType(payload),
    onSuccess: () => {
      toast.success('Delete tipe mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete tipe mobil gagal, silahkan coba lagi')
    },
  })
}
