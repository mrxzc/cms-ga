import { APIBaseResponse } from '@interfaces/api'
import {
  IGcmCarFuel,
  IGcmCarFuelCreatePayload,
  IGcmCarFuelDeletePayload,
  IGcmCarFuelDetailParams,
  IGcmCarFuelListParams,
  IGcmCarFuelToggleStatusPayload,
  IGcmCarFuelUpdatePayload,
} from '@interfaces/gcmCarFuel'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyCreateCarFuel,
//   dummyDeleteCarFuel,
//   dummyGetCarFuel,
//   dummyGetCarFuelDetail,
//   dummyToggleStatusCarFuel,
//   dummyUpdateCarFuel,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetCarFuel(params: IGcmCarFuelListParams, idUser: string): Promise<APIBaseResponse<IGcmCarFuel[]>> {
  // return dummyGetCarFuel()

  const headers = {
    idUser,
  }
  return api.get<IGcmCarFuel[], APIBaseResponse<IGcmCarFuel[]>>('/cms/master/carFuel/list', { params, headers })
}

export function apiGetCarFuelDetail(
  params: IGcmCarFuelDetailParams,
  idUser: string
): Promise<APIBaseResponse<IGcmCarFuel>> {
  // return dummyGetCarFuelDetail()

  const headers = {
    idUser,
  }
  return api.get<IGcmCarFuel, APIBaseResponse<IGcmCarFuel>>('/cms/master/carFuel/detail', { params, headers })
}

export function apiCreateCarFuel(
  payload: IGcmCarFuelCreatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarFuel>> {
  // return dummyCreateCarFuel()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarFuel, APIBaseResponse<IGcmCarFuel>>('/cms/master/carFuel/create', payload, { headers })
}

export function apiUpdateCarFuel(
  payload: IGcmCarFuelUpdatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarFuel>> {
  // return dummyUpdateCarFuel()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarFuel, APIBaseResponse<IGcmCarFuel>>('/cms/master/carFuel/update', payload, { headers })
}

export function apiToggleStatusCarFuel(
  payload: IGcmCarFuelToggleStatusPayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarFuel>> {
  // return dummyToggleStatusCarFuel()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarFuel, APIBaseResponse<IGcmCarFuel>>('/cms/master/carFuel/toggleFlagActive', payload, {
    headers,
  })
}

export function apiDeleteCarFuel(payload: IGcmCarFuelDeletePayload, idUser: string): Promise<APIBaseResponse<any>> {
  // return dummyDeleteCarFuel()

  const headers = {
    idUser,
  }
  return api.post<any, APIBaseResponse<any>>('/cms/master/carFuel/delete', payload, { headers })
}
