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

export function apiGetRoomCapacity(
  params: IGcmRoomCapacityListParams,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomCapacity[]>> {
  // return dummyGetRoomCapacity()

  const headers = {
    idUser,
  }
  return api.get<IGcmRoomCapacity[], APIBaseResponse<IGcmRoomCapacity[]>>('/cms/master/roomCapacity/list', {
    params,
    headers,
  })
}

export function apiGetRoomCapacityDetail(
  params: IGcmRoomCapacityDetailParams,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomCapacity>> {
  // return dummyGetRoomCapacityDetail()

  const headers = {
    idUser,
  }
  return api.get<IGcmRoomCapacity, APIBaseResponse<IGcmRoomCapacity>>('/cms/master/roomCapacity/detail', {
    params,
    headers,
  })
}

export function apiCreateRoomCapacity(
  payload: IGcmRoomCapacityCreatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomCapacity>> {
  // return dummyCreateRoomCapacity()

  const headers = {
    idUser,
  }
  return api.post<IGcmRoomCapacity, APIBaseResponse<IGcmRoomCapacity>>('/cms/master/roomCapacity/create', payload, {
    headers,
  })
}

export function apiUpdateRoomCapacity(
  payload: IGcmRoomCapacityUpdatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomCapacity>> {
  // return dummyUpdateRoomCapacity()

  const headers = {
    idUser,
  }
  return api.post<IGcmRoomCapacity, APIBaseResponse<IGcmRoomCapacity>>('/cms/master/roomCapacity/update', payload, {
    headers,
  })
}

export function apiToggleStatusRoomCapacity(
  payload: IGcmRoomCapacityToggleStatusPayload,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomCapacity>> {
  // return dummyToggleStatusRoomCapacity()

  const headers = {
    idUser,
  }
  return api.post<IGcmRoomCapacity, APIBaseResponse<IGcmRoomCapacity>>(
    '/cms/master/roomCapacity/toggleFlagActive',
    payload,
    {
      headers,
    }
  )
}

export function apiDeleteRoomCapacity(
  payload: IGcmRoomCapacityDeletePayload,
  idUser: string
): Promise<APIBaseResponse<any>> {
  // return dummyDeleteRoomCapacity()

  const headers = {
    idUser,
  }
  return api.post<any, APIBaseResponse<any>>('/cms/master/roomCapacity/delete', payload, { headers })
}
