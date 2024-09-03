import {
  IGcmCarBrandCreatePayload,
  IGcmCarBrandDeletePayload,
  IGcmCarBrandToggleStatusPayload,
  IGcmCarBrandUpdatePayload,
} from '@interfaces/gcmCarBrand'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiCreateCarBrand, apiDeleteCarBrand, apiToggleStatusCarBrand, apiUpdateCarBrand } from './api'

// Create CarBrand
export const useMutateCreateCarBrand = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarBrandCreatePayload; idUser: string }) =>
      apiCreateCarBrand(payload, idUser),
    onSuccess: () => {
      toast.success('Tambah brand mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah brand mobil gagal, silahkan coba lagi')
    },
  })
}

// Update CarBrand
export const useMutateUpdateCarBrand = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarBrandUpdatePayload; idUser: string }) =>
      apiUpdateCarBrand(payload, idUser),
    onSuccess: () => {
      toast.success('Update brand mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update brand mobil gagal, silahkan coba lagi')
    },
  })
}

// Toggle Status CarBrand
export const useMutateToggleStatusCarBrand = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarBrandToggleStatusPayload; idUser: string }) =>
      apiToggleStatusCarBrand(payload, idUser),
    onSuccess: () => {
      toast.success('Update status brand mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update status brand mobil gagal, silahkan coba lagi')
    },
  })
}

// Delete CarBrand
export const useMutateDeleteCarBrand = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarBrandDeletePayload; idUser: string }) =>
      apiDeleteCarBrand(payload, idUser),
    onSuccess: () => {
      toast.success('Delete brand mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete brand mobil gagal, silahkan coba lagi')
    },
  })
}
