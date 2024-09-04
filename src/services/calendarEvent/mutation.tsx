import {
  ICalendarEventCreatePayload,
  ICalendarEventDeletePayload,
  ICalendarEventUpdatePayload,
} from '@interfaces/calendarEvent'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {
  apiCreateCalendarEvent,
  apiDeleteCalendarEvent,
  apiUpdateCalendarEvent,
  apiUploadImageCalendarEvent,
} from './api'

// Create CalendarEvent
export const useMutateCreateCalendarEvent = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: ICalendarEventCreatePayload; idUser: string }) =>
      apiCreateCalendarEvent(payload, idUser),
    onSuccess: () => {
      toast.success('Tambah event berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah event gagal, silahkan coba lagi')
    },
  })
}

// Update CalendarEvent
export const useMutateUpdateCalendarEvent = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: ICalendarEventUpdatePayload; idUser: string }) =>
      apiUpdateCalendarEvent(payload, idUser),
    onSuccess: () => {
      toast.success('Update event berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Update event gagal, silahkan coba lagi')
    },
  })
}

// Upload Image CalendarEvent
export const useMutateUploadImageCalendarEvent = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: FormData; idUser: string }) =>
      apiUploadImageCalendarEvent(payload, idUser),
    onSuccess: () => {
      toast.success('Upload gambar berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Upload gambar gagal, silahkan coba lagi')
    },
  })
}

// Delete CalendarEvent
export const useMutateDeleteCalendarEvent = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: ICalendarEventDeletePayload; idUser: string }) =>
      apiDeleteCalendarEvent(payload, idUser),
    onSuccess: () => {
      toast.success('Delete event berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Delete event gagal, silahkan coba lagi')
    },
  })
}
