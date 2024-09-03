import { APIBaseResponse } from '@interfaces/api'
import {
  IGcmCarType,
  IGcmCarTypeCreatePayload,
  IGcmCarTypeDeletePayload,
  IGcmCarTypeDetailParams,
  IGcmCarTypeListParams,
  IGcmCarTypeToggleStatusPayload,
  IGcmCarTypeUpdatePayload,
} from '@interfaces/gcmCarType'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyCreateCarType,
//   dummyDeleteCarType,
//   dummyGetCarType,
//   dummyGetCarTypeDetail,
//   dummyToggleStatusCarType,
//   dummyUpdateCarType,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetCarType(params: IGcmCarTypeListParams, idUser: string): Promise<APIBaseResponse<IGcmCarType[]>> {
  // return dummyGetCarType()

  const headers = {
    idUser,
  }
  return api.get<IGcmCarType[], APIBaseResponse<IGcmCarType[]>>('/cms/master/carType/list', { params, headers })
}

export function apiGetCarTypeDetail(
  params: IGcmCarTypeDetailParams,
  idUser: string
): Promise<APIBaseResponse<IGcmCarType>> {
  // return dummyGetCarTypeDetail()

  const headers = {
    idUser,
  }
  return api.get<IGcmCarType, APIBaseResponse<IGcmCarType>>('/cms/master/carType/detail', { params, headers })
}

export function apiCreateCarType(
  payload: IGcmCarTypeCreatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarType>> {
  // return dummyCreateCarType()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarType, APIBaseResponse<IGcmCarType>>('/cms/master/carType/create', payload, { headers })
}

export function apiUpdateCarType(
  payload: IGcmCarTypeUpdatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarType>> {
  // return dummyUpdateCarType()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarType, APIBaseResponse<IGcmCarType>>('/cms/master/carType/update', payload, { headers })
}

export function apiToggleStatusCarType(
  payload: IGcmCarTypeToggleStatusPayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarType>> {
  // return dummyToggleStatusCarType()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarType, APIBaseResponse<IGcmCarType>>('/cms/master/carType/toggleFlagActive', payload, {
    headers,
  })
}

export function apiDeleteCarType(payload: IGcmCarTypeDeletePayload, idUser: string): Promise<APIBaseResponse<{}>> {
  // return dummyDeleteCarType()

  const headers = {
    idUser,
  }
  return api.post<{}, APIBaseResponse<{}>>('/cms/master/carType/delete', payload, { headers })
}
