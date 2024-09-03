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
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarTypeCreatePayload; idUser: string }) =>
      apiCreateCarType(payload, idUser),
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
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarTypeUpdatePayload; idUser: string }) =>
      apiUpdateCarType(payload, idUser),
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
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarTypeToggleStatusPayload; idUser: string }) =>
      apiToggleStatusCarType(payload, idUser),
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
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarTypeDeletePayload; idUser: string }) =>
      apiDeleteCarType(payload, idUser),
    onSuccess: () => {
      toast.success('Delete tipe mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete tipe mobil gagal, silahkan coba lagi')
    },
  })
}
