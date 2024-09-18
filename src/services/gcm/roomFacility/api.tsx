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
  params: IGcmRoomFacilityDetailParams,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomFacility>> {
  // return dummyGetRoomFacilityDetail()

  const headers = {
    idUser,
  }
  return api.get<IGcmRoomFacility, APIBaseResponse<IGcmRoomFacility>>('/cms/master/roomFacility/detail', {
    params,
    headers,
  })
}

export function apiCreateRoomFacility(
  payload: IGcmRoomFacilityCreatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomFacility>> {
  // return dummyCreateRoomFacility()

  const headers = {
    idUser,
  }
  return api.post<IGcmRoomFacility, APIBaseResponse<IGcmRoomFacility>>('/cms/master/roomFacility/create', payload, {
    headers,
  })
}

export function apiUpdateRoomFacility(
  payload: IGcmRoomFacilityUpdatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomFacility>> {
  // return dummyUpdateRoomFacility()

  const headers = {
    idUser,
  }
  return api.post<IGcmRoomFacility, APIBaseResponse<IGcmRoomFacility>>('/cms/master/roomFacility/update', payload, {
    headers,
  })
}

export function apiToggleStatusRoomFacility(
  payload: IGcmRoomFacilityToggleStatusPayload,
  idUser: string
): Promise<APIBaseResponse<IGcmRoomFacility>> {
  // return dummyToggleStatusRoomFacility()

  const headers = {
    idUser,
  }
  return api.post<IGcmRoomFacility, APIBaseResponse<IGcmRoomFacility>>(
    '/cms/master/roomFacility/toggleFlagActive',
    payload,
    {
      headers,
    }
  )
}

export function apiDeleteRoomFacility(
  payload: IGcmRoomFacilityDeletePayload,
  idUser: string
): Promise<APIBaseResponse<any>> {
  // return dummyDeleteRoomFacility()

  const headers = {
    idUser,
  }
  return api.post<any, APIBaseResponse<any>>('/cms/master/roomFacility/delete', payload, { headers })
}
