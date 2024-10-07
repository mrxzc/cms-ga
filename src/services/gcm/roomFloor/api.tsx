import { APIBaseResponse } from '@interfaces/api'
import {
  IGcmRoomFloor,
  IGcmRoomFloorCreatePayload,
  IGcmRoomFloorDeletePayload,
  IGcmRoomFloorDetailParams,
  IGcmRoomFloorListParams,
  IGcmRoomFloorToggleStatusPayload,
  IGcmRoomFloorUpdatePayload,
} from '@interfaces/gcmRoomFloor'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyCreateRoomFloor,
//   dummyDeleteRoomFloor,
//   dummyGetRoomFloor,
//   dummyGetRoomFloorDetail,
//   dummyToggleStatusRoomFloor,
//   dummyUpdateRoomFloor,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetRoomFloor(params: IGcmRoomFloorListParams): Promise<APIBaseResponse<IGcmRoomFloor[]>> {
  // return dummyGetRoomFloor()

  return api.get<IGcmRoomFloor[], APIBaseResponse<IGcmRoomFloor[]>>('/cms/master/roomFloor/list', { params })
}

export function apiGetRoomFloorDetail(params: IGcmRoomFloorDetailParams): Promise<APIBaseResponse<IGcmRoomFloor>> {
  //  // return dummyGetRoomFloorDetail()

  return api.get<IGcmRoomFloor, APIBaseResponse<IGcmRoomFloor>>('/cms/master/roomFloor/detail', { params })
}

export function apiCreateRoomFloor(payload: IGcmRoomFloorCreatePayload): Promise<APIBaseResponse<IGcmRoomFloor>> {
  //  // return dummyCreateRoomFloor()

  return api.post<IGcmRoomFloor, APIBaseResponse<IGcmRoomFloor>>('/cms/master/roomFloor/create', payload)
}

export function apiUpdateRoomFloor(payload: IGcmRoomFloorUpdatePayload): Promise<APIBaseResponse<IGcmRoomFloor>> {
  //  // return dummyUpdateRoomFloor()

  return api.post<IGcmRoomFloor, APIBaseResponse<IGcmRoomFloor>>('/cms/master/roomFloor/update', payload)
}

export function apiToggleStatusRoomFloor(
  payload: IGcmRoomFloorToggleStatusPayload
): Promise<APIBaseResponse<IGcmRoomFloor>> {
  //  // return dummyToggleStatusRoomFloor()

  return api.post<IGcmRoomFloor, APIBaseResponse<IGcmRoomFloor>>('/cms/master/roomFloor/toggleFlagActive', payload)
}

export function apiDeleteRoomFloor(payload: IGcmRoomFloorDeletePayload): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteRoomFloor()

  return api.post<any, APIBaseResponse<any>>('/cms/master/roomFloor/delete', payload)
}
