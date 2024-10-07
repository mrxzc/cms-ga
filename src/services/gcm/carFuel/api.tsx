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

export function apiGetCarFuel(params: IGcmCarFuelListParams): Promise<APIBaseResponse<IGcmCarFuel[]>> {
  //  // return dummyGetCarFuel()

  return api.get<IGcmCarFuel[], APIBaseResponse<IGcmCarFuel[]>>('/cms/master/carFuel/list', { params })
}

export function apiGetCarFuelDetail(params: IGcmCarFuelDetailParams): Promise<APIBaseResponse<IGcmCarFuel>> {
  //  // return dummyGetCarFuelDetail()

  return api.get<IGcmCarFuel, APIBaseResponse<IGcmCarFuel>>('/cms/master/carFuel/detail', { params })
}

export function apiCreateCarFuel(payload: IGcmCarFuelCreatePayload): Promise<APIBaseResponse<IGcmCarFuel>> {
  //  // return dummyCreateCarFuel()

  return api.post<IGcmCarFuel, APIBaseResponse<IGcmCarFuel>>('/cms/master/carFuel/create', payload)
}

export function apiUpdateCarFuel(payload: IGcmCarFuelUpdatePayload): Promise<APIBaseResponse<IGcmCarFuel>> {
  //  // return dummyUpdateCarFuel()

  return api.post<IGcmCarFuel, APIBaseResponse<IGcmCarFuel>>('/cms/master/carFuel/update', payload)
}

export function apiToggleStatusCarFuel(payload: IGcmCarFuelToggleStatusPayload): Promise<APIBaseResponse<IGcmCarFuel>> {
  //  // return dummyToggleStatusCarFuel()

  return api.post<IGcmCarFuel, APIBaseResponse<IGcmCarFuel>>('/cms/master/carFuel/toggleFlagActive', payload)
}

export function apiDeleteCarFuel(payload: IGcmCarFuelDeletePayload): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteCarFuel()

  return api.post<any, APIBaseResponse<any>>('/cms/master/carFuel/delete', payload)
}
