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

export function apiGetCarYear(params: IGcmCarYearListParams): Promise<APIBaseResponse<IGcmCarYear[]>> {
  //  // return dummyGetCarYear()

  return api.get<IGcmCarYear[], APIBaseResponse<IGcmCarYear[]>>('/cms/master/carYear/list', { params })
}

export function apiGetCarYearDetail(params: IGcmCarYearDetailParams): Promise<APIBaseResponse<IGcmCarYear>> {
  //  // return dummyGetCarYearDetail()

  return api.get<IGcmCarYear, APIBaseResponse<IGcmCarYear>>('/cms/master/carYear/detail', { params })
}

export function apiCreateCarYear(payload: IGcmCarYearCreatePayload): Promise<APIBaseResponse<IGcmCarYear>> {
  //  // return dummyCreateCarYear()

  return api.post<IGcmCarYear, APIBaseResponse<IGcmCarYear>>('/cms/master/carYear/create', payload)
}

export function apiUpdateCarYear(payload: IGcmCarYearUpdatePayload): Promise<APIBaseResponse<IGcmCarYear>> {
  //  // return dummyUpdateCarYear()

  return api.post<IGcmCarYear, APIBaseResponse<IGcmCarYear>>('/cms/master/carYear/update', payload)
}

export function apiToggleStatusCarYear(payload: IGcmCarYearToggleStatusPayload): Promise<APIBaseResponse<IGcmCarYear>> {
  //  // return dummyToggleStatusCarYear()

  return api.post<IGcmCarYear, APIBaseResponse<IGcmCarYear>>('/cms/master/carYear/toggleFlagActive', payload)
}

export function apiDeleteCarYear(payload: IGcmCarYearDeletePayload): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteCarYear()

  return api.post<any, APIBaseResponse<any>>('/cms/master/carYear/delete', payload)
}
