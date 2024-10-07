import { APIBaseResponse } from '@interfaces/api'
import {
  IGcmRoomCapacity,
  IGcmRoomCapacityCreatePayload,
  IGcmRoomCapacityDeletePayload,
  IGcmRoomCapacityDetailParams,
  IGcmRoomCapacityListParams,
  IGcmRoomCapacityToggleStatusPayload,
  IGcmRoomCapacityUpdatePayload,
} from '@interfaces/gcmRoomCapacity'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyCreateRoomCapacity,
//   dummyDeleteRoomCapacity,
//   dummyGetRoomCapacity,
//   dummyGetRoomCapacityDetail,
//   dummyToggleStatusRoomCapacity,
//   dummyUpdateRoomCapacity,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetRoomCapacity(params: IGcmRoomCapacityListParams): Promise<APIBaseResponse<IGcmRoomCapacity[]>> {
  // return dummyGetRoomCapacity()

  return api.get<IGcmRoomCapacity[], APIBaseResponse<IGcmRoomCapacity[]>>('/cms/master/roomCapacity/list', {
    params,
  })
}

export function apiGetRoomCapacityDetail(
  params: IGcmRoomCapacityDetailParams
): Promise<APIBaseResponse<IGcmRoomCapacity>> {
  //  // return dummyGetRoomCapacityDetail()

  return api.get<IGcmRoomCapacity, APIBaseResponse<IGcmRoomCapacity>>('/cms/master/roomCapacity/detail', {
    params,
  })
}

export function apiCreateRoomCapacity(
  payload: IGcmRoomCapacityCreatePayload
): Promise<APIBaseResponse<IGcmRoomCapacity>> {
  //  // return dummyCreateRoomCapacity()

  return api.post<IGcmRoomCapacity, APIBaseResponse<IGcmRoomCapacity>>('/cms/master/roomCapacity/create', payload)
}

export function apiUpdateRoomCapacity(
  payload: IGcmRoomCapacityUpdatePayload
): Promise<APIBaseResponse<IGcmRoomCapacity>> {
  //  // return dummyUpdateRoomCapacity()

  return api.post<IGcmRoomCapacity, APIBaseResponse<IGcmRoomCapacity>>('/cms/master/roomCapacity/update', payload)
}

export function apiToggleStatusRoomCapacity(
  payload: IGcmRoomCapacityToggleStatusPayload
): Promise<APIBaseResponse<IGcmRoomCapacity>> {
  //  // return dummyToggleStatusRoomCapacity()

  return api.post<IGcmRoomCapacity, APIBaseResponse<IGcmRoomCapacity>>(
    '/cms/master/roomCapacity/toggleFlagActive',
    payload
  )
}

export function apiDeleteRoomCapacity(payload: IGcmRoomCapacityDeletePayload): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteRoomCapacity()

  return api.post<any, APIBaseResponse<any>>('/cms/master/roomCapacity/delete', payload)
}
