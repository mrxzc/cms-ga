import {
  IGcmCarYearCreatePayload,
  IGcmCarYearDeletePayload,
  IGcmCarYearToggleStatusPayload,
  IGcmCarYearUpdatePayload,
} from '@interfaces/gcmCarYear'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiCreateCarYear, apiDeleteCarYear, apiToggleStatusCarYear, apiUpdateCarYear } from './api'

// Create CarYear
export const useMutateCreateCarYear = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmCarYearCreatePayload }) => apiCreateCarYear(payload),
    onSuccess: () => {
      toast.success('Tambah tahun berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah tahun gagal, silahkan coba lagi')
    },
  })
}

// Update CarYear
export const useMutateUpdateCarYear = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmCarYearUpdatePayload }) => apiUpdateCarYear(payload),
    onSuccess: () => {
      toast.success('Update tahun berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update tahun gagal, silahkan coba lagi')
    },
  })
}

// Toggle Status CarYear
export const useMutateToggleStatusCarYear = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmCarYearToggleStatusPayload }) => apiToggleStatusCarYear(payload),
    onSuccess: () => {
      toast.success('Update status tahun berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update status tahun gagal, silahkan coba lagi')
    },
  })
}

// Delete CarYear
export const useMutateDeleteCarYear = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IGcmCarYearDeletePayload }) => apiDeleteCarYear(payload),
    onSuccess: () => {
      toast.success('Delete tahun berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete tahun gagal, silahkan coba lagi')
    },
  })
}
