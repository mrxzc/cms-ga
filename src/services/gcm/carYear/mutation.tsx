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
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarYearCreatePayload; idUser: string }) =>
      apiCreateCarYear(payload, idUser),
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
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarYearUpdatePayload; idUser: string }) =>
      apiUpdateCarYear(payload, idUser),
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
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarYearToggleStatusPayload; idUser: string }) =>
      apiToggleStatusCarYear(payload, idUser),
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
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarYearDeletePayload; idUser: string }) =>
      apiDeleteCarYear(payload, idUser),
    onSuccess: () => {
      toast.success('Delete tahun berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete tahun gagal, silahkan coba lagi')
    },
  })
}
