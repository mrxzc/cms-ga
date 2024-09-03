import { APIBaseResponse } from '@interfaces/api'
import {
  IGcmCarYear,
  IGcmCarYearCreatePayload,
  IGcmCarYearDeletePayload,
  IGcmCarYearDetailParams,
  IGcmCarYearListParams,
  IGcmCarYearToggleStatusPayload,
  IGcmCarYearUpdatePayload,
} from '@interfaces/gcmCarYear'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyCreateCarYear,
//   dummyDeleteCarYear,
//   dummyGetCarYear,
//   dummyGetCarYearDetail,
//   dummyToggleStatusCarYear,
//   dummyUpdateCarYear,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetCarYear(params: IGcmCarYearListParams, idUser: string): Promise<APIBaseResponse<IGcmCarYear[]>> {
  // return dummyGetCarYear()

  const headers = {
    idUser,
  }
  return api.get<IGcmCarYear[], APIBaseResponse<IGcmCarYear[]>>('/cms/master/carYear/list', { params, headers })
}

export function apiGetCarYearDetail(
  params: IGcmCarYearDetailParams,
  idUser: string
): Promise<APIBaseResponse<IGcmCarYear>> {
  // return dummyGetCarYearDetail()

  const headers = {
    idUser,
  }
  return api.get<IGcmCarYear, APIBaseResponse<IGcmCarYear>>('/cms/master/carYear/detail', { params, headers })
}

export function apiCreateCarYear(
  payload: IGcmCarYearCreatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarYear>> {
  // return dummyCreateCarYear()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarYear, APIBaseResponse<IGcmCarYear>>('/cms/master/carYear/create', payload, { headers })
}

export function apiUpdateCarYear(
  payload: IGcmCarYearUpdatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarYear>> {
  // return dummyUpdateCarYear()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarYear, APIBaseResponse<IGcmCarYear>>('/cms/master/carYear/update', payload, { headers })
}

export function apiToggleStatusCarYear(
  payload: IGcmCarYearToggleStatusPayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarYear>> {
  // return dummyToggleStatusCarYear()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarYear, APIBaseResponse<IGcmCarYear>>('/cms/master/carYear/toggleFlagActive', payload, {
    headers,
  })
}

export function apiDeleteCarYear(payload: IGcmCarYearDeletePayload, idUser: string): Promise<APIBaseResponse<any>> {
  // return dummyDeleteCarYear()

  const headers = {
    idUser,
  }
  return api.post<any, APIBaseResponse<any>>('/cms/master/carYear/delete', payload, { headers })
}
