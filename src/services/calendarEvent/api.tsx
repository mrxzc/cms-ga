import { APIBaseResponse } from '@interfaces/api'
import {
  ICalendarEventCreatePayload,
  ICalendarEventDeletePayload,
  ICalendarEventDetail,
  ICalendarEventDetailParams,
  ICalendarEventList,
  ICalendarEventListParams,
  ICalendarEventUpdatePayload,
} from '@interfaces/calendarEvent'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyCreateCalendarEvent,
//   dummyDeleteCalendarEvent,
//   dummyGetCalendarEvent,
//   dummyGetCalendarEventDetail,
//   dummyUpdateCalendarEvent,
//   dummyUploadImageCalendarEvent,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetCalendarEvent(
  params: ICalendarEventListParams,
  idUser: string
): Promise<APIBaseResponse<ICalendarEventList[]>> {
  // return dummyGetCalendarEvent()

  const headers = {
    idUser,
  }
  return api.get<ICalendarEventList[], APIBaseResponse<ICalendarEventList[]>>('/cms/master/calendarEvent/list', {
    params,
    headers,
  })
}

export function apiGetCalendarEventDetail(
  params: ICalendarEventDetailParams,
  idUser: string
): Promise<APIBaseResponse<ICalendarEventDetail>> {
  // return dummyGetCalendarEventDetail()

  const headers = {
    idUser,
  }
  return api.get<ICalendarEventDetail, APIBaseResponse<ICalendarEventDetail>>('/cms/master/calendarEvent/detail', {
    params,
    headers,
  })
}

export function apiCreateCalendarEvent(
  payload: ICalendarEventCreatePayload,
  idUser: string
): Promise<APIBaseResponse<ICalendarEventDetail>> {
  // return dummyCreateCalendarEvent()

  const headers = {
    idUser,
  }
  return api.post<ICalendarEventDetail, APIBaseResponse<ICalendarEventDetail>>(
    '/cms/master/calendarEvent/create',
    payload,
    { headers }
  )
}

export function apiUpdateCalendarEvent(
  payload: ICalendarEventUpdatePayload,
  idUser: string
): Promise<APIBaseResponse<ICalendarEventDetail>> {
  // return dummyUpdateCalendarEvent()

  const headers = {
    idUser,
  }
  return api.post<ICalendarEventDetail, APIBaseResponse<ICalendarEventDetail>>(
    '/cms/master/calendarEvent/update',
    payload,
    { headers }
  )
}

export function apiUploadImageCalendarEvent(payload: FormData, idUser: string): Promise<APIBaseResponse<string>> {
  // return dummyUploadImageCalendarEvent()

  const headers = {
    idUser,
    'Content-Type': 'multipart/form-data',
  }

  return api.post<string, APIBaseResponse<string>>('/cms/master/calendarEvent/uploadImage', payload, { headers })
}

export function apiDeleteCalendarEvent(
  payload: ICalendarEventDeletePayload,
  idUser: string
): Promise<APIBaseResponse<ICalendarEventDetail>> {
  // return dummyDeleteCalendarEvent()

  const headers = {
    idUser,
  }
  return api.post<ICalendarEventDetail, APIBaseResponse<ICalendarEventDetail>>(
    '/cms/master/calendarEvent/delete',
    payload,
    { headers }
  )
}
