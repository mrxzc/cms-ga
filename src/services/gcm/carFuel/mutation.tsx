import {
  IGcmCarFuelCreatePayload,
  IGcmCarFuelDeletePayload,
  IGcmCarFuelToggleStatusPayload,
  IGcmCarFuelUpdatePayload,
} from '@interfaces/gcmCarFuel'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiCreateCarFuel, apiDeleteCarFuel, apiToggleStatusCarFuel, apiUpdateCarFuel } from './api'

// Create CarFuel
export const useMutateCreateCarFuel = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarFuelCreatePayload; idUser: string }) =>
      apiCreateCarFuel(payload, idUser),
    onSuccess: () => {
      toast.success('Tambah bahan bakar berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah bahan bakar gagal, silahkan coba lagi')
    },
  })
}

// Update CarFuel
export const useMutateUpdateCarFuel = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarFuelUpdatePayload; idUser: string }) =>
      apiUpdateCarFuel(payload, idUser),
    onSuccess: () => {
      toast.success('Update bahan bakar berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update bahan bakar gagal, silahkan coba lagi')
    },
  })
}

// Toggle Status CarFuel
export const useMutateToggleStatusCarFuel = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarFuelToggleStatusPayload; idUser: string }) =>
      apiToggleStatusCarFuel(payload, idUser),
    onSuccess: () => {
      toast.success('Update status bahan bakar berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update status bahan bakar gagal, silahkan coba lagi')
    },
  })
}

// Delete CarFuel
export const useMutateDeleteCarFuel = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IGcmCarFuelDeletePayload; idUser: string }) =>
      apiDeleteCarFuel(payload, idUser),
    onSuccess: () => {
      toast.success('Delete bahan bakar berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete bahan bakar gagal, silahkan coba lagi')
    },
  })
}
