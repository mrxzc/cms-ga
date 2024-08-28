import { useMutation } from '@tanstack/react-query'
import { apiSubmitCreateRoom, apiSubmitUpdateRoom } from './api'
import { queryClient } from '@services/config/queryClient'
import { ICreateRoomPayload, IUpdateRoomPayload } from '@interfaces/room'
import { toast } from 'react-toastify'

// Membuat ruangan baru
export const useCreateRoom = () => {
  return useMutation({
    mutationFn: (payload: ICreateRoomPayload) => apiSubmitCreateRoom(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roomList'] })
    },
    onError: (error: Error) => {
      // Specify the error type
      toast.error(error.message) // Pass the error message as a string
    },
  })
}

// Memperbarui ruangan
export const useUpdateRoom = () => {
  return useMutation({
    mutationFn: (payload: IUpdateRoomPayload) => apiSubmitUpdateRoom(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roomList'] })
      queryClient.invalidateQueries({ queryKey: ['roomDetail'] })
    },
    onError: (error: Error) => {
      // Specify the error type
      toast.error(error.message) // Pass the error message as a string
    },
  })
}
