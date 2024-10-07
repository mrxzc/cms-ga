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

export function apiGetCarType(params: IGcmCarTypeListParams): Promise<APIBaseResponse<IGcmCarType[]>> {
  //  // return dummyGetCarType()

  return api.get<IGcmCarType[], APIBaseResponse<IGcmCarType[]>>('/cms/master/carType/list', { params })
}

export function apiGetCarTypeDetail(params: IGcmCarTypeDetailParams): Promise<APIBaseResponse<IGcmCarType>> {
  //  // return dummyGetCarTypeDetail()

  return api.get<IGcmCarType, APIBaseResponse<IGcmCarType>>('/cms/master/carType/detail', { params })
}

export function apiCreateCarType(payload: IGcmCarTypeCreatePayload): Promise<APIBaseResponse<IGcmCarType>> {
  //  // return dummyCreateCarType()

  return api.post<IGcmCarType, APIBaseResponse<IGcmCarType>>('/cms/master/carType/create', payload)
}

export function apiUpdateCarType(payload: IGcmCarTypeUpdatePayload): Promise<APIBaseResponse<IGcmCarType>> {
  //  // return dummyUpdateCarType()

  return api.post<IGcmCarType, APIBaseResponse<IGcmCarType>>('/cms/master/carType/update', payload)
}

export function apiToggleStatusCarType(payload: IGcmCarTypeToggleStatusPayload): Promise<APIBaseResponse<IGcmCarType>> {
  //  // return dummyToggleStatusCarType()

  return api.post<IGcmCarType, APIBaseResponse<IGcmCarType>>('/cms/master/carType/toggleFlagActive', payload)
}

export function apiDeleteCarType(payload: IGcmCarTypeDeletePayload): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteCarType()

  return api.post<any, APIBaseResponse<any>>('/cms/master/carType/delete', payload)
}
