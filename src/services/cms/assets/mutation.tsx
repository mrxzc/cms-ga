import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@services/config/queryClient'
import { toast } from 'react-toastify'
import { apiSubmitCreateAsset, apiSubmitUpdateAsset, apiUploadImageAsset } from './api'
import { ICreateAssetPayload, IUpdateAssetPayload } from '@interfaces/assets'

// Membuat asset baru
export const useMutateCreateRoom = () => {
  return useMutation({
    mutationFn: async (payload: ICreateAssetPayload) => apiSubmitCreateAsset(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assetList'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Memperbarui asset
export const useMutateUpdateRoom = () => {
  return useMutation({
    mutationFn: async (payload: IUpdateAssetPayload) => apiSubmitUpdateAsset(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assetList'] })
      queryClient.invalidateQueries({ queryKey: ['assetDetail'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Upload Image CalendarEvent
export const useMutateUploadImageCalendarEvent = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => apiUploadImageAsset(payload),
    onSuccess: () => {
      toast.success('Upload gambar berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Upload gambar gagal, silahkan coba lagi')
    },
  })
}
