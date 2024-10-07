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
    mutationFn: async ({ payload }: { payload: IGcmCarBrandCreatePayload }) => apiCreateCarBrand(payload),
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
    mutationFn: async ({ payload }: { payload: IGcmCarBrandUpdatePayload }) => apiUpdateCarBrand(payload),
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
    mutationFn: async ({ payload }: { payload: IGcmCarBrandToggleStatusPayload }) => apiToggleStatusCarBrand(payload),
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
    mutationFn: async ({ payload }: { payload: IGcmCarBrandDeletePayload }) => apiDeleteCarBrand(payload),
    onSuccess: () => {
      toast.success('Delete brand mobil berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete brand mobil gagal, silahkan coba lagi')
    },
  })
}
