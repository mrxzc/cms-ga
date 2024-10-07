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
  return api.get<IGcmLocation[], APIBaseResponse<IGcmLocation[]>>('/cms/master/location/list', { params })
}

export function apiGetLocationDetail(params: IGcmLocationDetailParams): Promise<APIBaseResponse<IGcmLocation>> {
  //  // return dummyGetLocationDetail()

  return api.get<IGcmLocation, APIBaseResponse<IGcmLocation>>('/cms/master/location/detail', { params })
}

export function apiCreateLocation(payload: IGcmLocationCreatePayload): Promise<APIBaseResponse<IGcmLocation>> {
  //  // return dummyCreateLocation()

  return api.post<IGcmLocation, APIBaseResponse<IGcmLocation>>('/cms/master/location/create', payload)
}

export function apiUpdateLocation(payload: IGcmLocationUpdatePayload): Promise<APIBaseResponse<IGcmLocation>> {
  //  // return dummyUpdateLocation()

  return api.post<IGcmLocation, APIBaseResponse<IGcmLocation>>('/cms/master/location/update', payload)
}

export function apiToggleStatusLocation(
  payload: IGcmLocationToggleStatusPayload
): Promise<APIBaseResponse<IGcmLocation>> {
  //  // return dummyToggleStatusLocation()

  return api.post<IGcmLocation, APIBaseResponse<IGcmLocation>>('/cms/master/location/toggleFlagActive', payload)
}

export function apiDeleteLocation(payload: IGcmLocationDeletePayload): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteLocation()

  return api.post<any, APIBaseResponse<any>>('/cms/master/location/delete', payload)
}
