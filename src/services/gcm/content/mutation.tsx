import { IDeleteContentParams } from '@interfaces/gcmContent'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiCreateContent, apiDeleteContent } from './api'

// Create Content
export const useMutateCreateContent = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => apiCreateContent(formData),
    onSuccess: () => {
      toast.success('Tambah konten berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah konten gagal, silahkan coba lagi')
    },
  })
}

// Delete Content
export const useMutateDeleteContent = () => {
  return useMutation({
    mutationFn: async ({ params }: { params: IDeleteContentParams }) => apiDeleteContent(params),
    onSuccess: () => {
      toast.success('Hapus konten berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Hapus konten gagal, silahkan coba lagi')
    },
  })
}
