import { APIBaseResponse } from '@interfaces/api'
import {
  IGcmLocation,
  IGcmLocationCreatePayload,
  IGcmLocationDeletePayload,
  IGcmLocationDetailParams,
  IGcmLocationListParams,
  IGcmLocationToggleStatusPayload,
  IGcmLocationUpdatePayload,
} from '@interfaces/gcmLocation'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyCreateLocation,
//   dummyDeleteLocation,
//   dummyGetLocation,
//   dummyGetLocationDetail,
//   dummyToggleStatusLocation,
//   dummyUpdateLocation,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetLocation(params: IGcmLocationListParams): Promise<APIBaseResponse<IGcmLocation[]>> {
  // return dummyGetLocation()

  return api.get<IGcmLocation[], APIBaseResponse<IGcmLocation[]>>('/cms/master/location/list', { params })
}

export function apiGetLocationDetail(
  params: IGcmLocationDetailParams,
  idUser: string
): Promise<APIBaseResponse<IGcmLocation>> {
  //  // return dummyGetLocationDetail()

  const headers = {
    idUser,
  }
  return api.get<IGcmLocation, APIBaseResponse<IGcmLocation>>('/cms/master/location/detail', { params, headers })
}

export function apiCreateLocation(
  payload: IGcmLocationCreatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmLocation>> {
  //  // return dummyCreateLocation()

  const headers = {
    idUser,
  }
  return api.post<IGcmLocation, APIBaseResponse<IGcmLocation>>('/cms/master/location/create', payload, { headers })
}

export function apiUpdateLocation(
  payload: IGcmLocationUpdatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmLocation>> {
  //  // return dummyUpdateLocation()

  const headers = {
    idUser,
  }
  return api.post<IGcmLocation, APIBaseResponse<IGcmLocation>>('/cms/master/location/update', payload, { headers })
}

export function apiToggleStatusLocation(
  payload: IGcmLocationToggleStatusPayload,
  idUser: string
): Promise<APIBaseResponse<IGcmLocation>> {
  //  // return dummyToggleStatusLocation()

  const headers = {
    idUser,
  }
  return api.post<IGcmLocation, APIBaseResponse<IGcmLocation>>('/cms/master/location/toggleFlagActive', payload, {
    headers,
  })
}

export function apiDeleteLocation(payload: IGcmLocationDeletePayload, idUser: string): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteLocation()

  const headers = {
    idUser,
  }
  return api.post<any, APIBaseResponse<any>>('/cms/master/location/delete', payload, { headers })
}
