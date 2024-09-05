import { ICalendarEventDetailParams, ICalendarEventListParams } from '@interfaces/calendarEvent'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetCalendarEvent, apiGetCalendarEventDetail } from './api'

// Get CalendarEvent
export const useGetCalendarEvent = (params: ICalendarEventListParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/calendarEvent/list', params],
    queryFn: async () =>
      apiGetCalendarEvent(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get CalendarEvent Detail
export const useGetCalendarEventDetail = (params: ICalendarEventDetailParams, idUser: string) => {
  return useQuery({
    queryKey: ['/cms/master/calendarEvent/detail', params],
    queryFn: async () =>
      apiGetCalendarEventDetail(params, idUser).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
