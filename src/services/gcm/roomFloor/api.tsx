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
import {
  dummyCreateRoomFloor,
  dummyDeleteRoomFloor,
  dummyGetRoomFloor,
  dummyGetRoomFloorDetail,
  dummyToggleStatusRoomFloor,
  dummyUpdateRoomFloor,
} from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetRoomFloor(
  params: IGcmRoomFloorListParams,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomFloor[]>> {
  return dummyGetRoomFloor()

  const headers = {
    idUser,
  }
  return api.get<IGcmRoomFloor[], APIBaseResponse<IGcmRoomFloor[]>>('/cms/master/location/list', { params, headers })
}

export function apiGetRoomFloorDetail(
  params: IGcmRoomFloorDetailParams,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomFloor>> {
  return dummyGetRoomFloorDetail()

  const headers = {
    idUser,
  }
  return api.get<IGcmRoomFloor, APIBaseResponse<IGcmRoomFloor>>('/cms/master/location/detail', { params, headers })
}

export function apiCreateRoomFloor(
  payload: IGcmRoomFloorCreatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomFloor>> {
  return dummyCreateRoomFloor()

  const headers = {
    idUser,
  }
  return api.post<IGcmRoomFloor, APIBaseResponse<IGcmRoomFloor>>('/cms/master/location/create', payload, { headers })
}

export function apiUpdateRoomFloor(
  payload: IGcmRoomFloorUpdatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomFloor>> {
  return dummyUpdateRoomFloor()

  const headers = {
    idUser,
  }
  return api.post<IGcmRoomFloor, APIBaseResponse<IGcmRoomFloor>>('/cms/master/location/update', payload, { headers })
}

export function apiToggleStatusRoomFloor(
  payload: IGcmRoomFloorToggleStatusPayload,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomFloor>> {
  return dummyToggleStatusRoomFloor()

  const headers = {
    idUser,
  }
  return api.post<IGcmRoomFloor, APIBaseResponse<IGcmRoomFloor>>('/cms/master/location/toggleFlagActive', payload, {
    headers,
  })
}

export function apiDeleteRoomFloor(payload: IGcmRoomFloorDeletePayload, idUser: string): Promise<APIBaseResponse<{}>> {
  return dummyDeleteRoomFloor()

  const headers = {
    idUser,
  }
  return api.post<{}, APIBaseResponse<{}>>('/cms/master/location/delete', payload, { headers })
}
