import { APIBaseResponse } from '@interfaces/api'
import {
  IGcmRoomFacility,
  IGcmRoomFacilityCreatePayload,
  IGcmRoomFacilityDeletePayload,
  IGcmRoomFacilityDetailParams,
  IGcmRoomFacilityListParams,
  IGcmRoomFacilityToggleStatusPayload,
  IGcmRoomFacilityUpdatePayload,
} from '@interfaces/gcmRoomFacility'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyCreateRoomFacility,
//   dummyDeleteRoomFacility,
//   dummyGetRoomFacility,
//   dummyGetRoomFacilityDetail,
//   dummyToggleStatusRoomFacility,
//   dummyUpdateRoomFacility,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetRoomFacility(params: IGcmRoomFacilityListParams): Promise<APIBaseResponse<IGcmRoomFacility[]>> {
  // return dummyGetRoomFacility()

  return api.get<IGcmRoomFacility[], APIBaseResponse<IGcmRoomFacility[]>>('/cms/master/roomFacility/list', {
    params,
  })
}

export function apiGetRoomFacilityDetail(
  params: IGcmRoomFacilityDetailParams
): Promise<APIBaseResponse<IGcmRoomFacility>> {
  //  // return dummyGetRoomFacilityDetail()

  return api.get<IGcmRoomFacility, APIBaseResponse<IGcmRoomFacility>>('/cms/master/roomFacility/detail', {
    params,
  })
}

export function apiCreateRoomFacility(
  payload: IGcmRoomFacilityCreatePayload
): Promise<APIBaseResponse<IGcmRoomFacility>> {
  //  // return dummyCreateRoomFacility()

  return api.post<IGcmRoomFacility, APIBaseResponse<IGcmRoomFacility>>('/cms/master/roomFacility/create', payload)
}

export function apiUpdateRoomFacility(
  payload: IGcmRoomFacilityUpdatePayload
): Promise<APIBaseResponse<IGcmRoomFacility>> {
  //  // return dummyUpdateRoomFacility()

  return api.post<IGcmRoomFacility, APIBaseResponse<IGcmRoomFacility>>('/cms/master/roomFacility/update', payload)
}

export function apiToggleStatusRoomFacility(
  payload: IGcmRoomFacilityToggleStatusPayload
): Promise<APIBaseResponse<IGcmRoomFacility>> {
  //  // return dummyToggleStatusRoomFacility()

  return api.post<IGcmRoomFacility, APIBaseResponse<IGcmRoomFacility>>(
    '/cms/master/roomFacility/toggleFlagActive',
    payload
  )
}

export function apiDeleteRoomFacility(payload: IGcmRoomFacilityDeletePayload): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteRoomFacility()

  return api.post<any, APIBaseResponse<any>>('/cms/master/roomFacility/delete', payload)
}
