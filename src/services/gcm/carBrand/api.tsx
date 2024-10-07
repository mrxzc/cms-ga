import { APIBaseResponse } from '@interfaces/api'
import {
  IGcmCarBrand,
  IGcmCarBrandCreatePayload,
  IGcmCarBrandDeletePayload,
  IGcmCarBrandDetailParams,
  IGcmCarBrandListParams,
  IGcmCarBrandToggleStatusPayload,
  IGcmCarBrandUpdatePayload,
} from '@interfaces/gcmCarBrand'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyCreateCarBrand,
//   dummyDeleteCarBrand,
//   dummyGetCarBrand,
//   dummyGetCarBrandDetail,
//   dummyToggleStatusCarBrand,
//   dummyUpdateCarBrand,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetCarBrand(params: IGcmCarBrandListParams): Promise<APIBaseResponse<IGcmCarBrand[]>> {
  //  // return dummyGetCarBrand()

  return api.get<IGcmCarBrand[], APIBaseResponse<IGcmCarBrand[]>>('/cms/master/carBrand/list', { params })
}

export function apiGetCarBrandDetail(params: IGcmCarBrandDetailParams): Promise<APIBaseResponse<IGcmCarBrand>> {
  //  // return dummyGetCarBrandDetail()

  return api.get<IGcmCarBrand, APIBaseResponse<IGcmCarBrand>>('/cms/master/carBrand/detail', { params })
}

export function apiCreateCarBrand(payload: IGcmCarBrandCreatePayload): Promise<APIBaseResponse<IGcmCarBrand>> {
  //  // return dummyCreateCarBrand()

  return api.post<IGcmCarBrand, APIBaseResponse<IGcmCarBrand>>('/cms/master/carBrand/create', payload)
}

export function apiUpdateCarBrand(payload: IGcmCarBrandUpdatePayload): Promise<APIBaseResponse<IGcmCarBrand>> {
  //  // return dummyUpdateCarBrand()

  return api.post<IGcmCarBrand, APIBaseResponse<IGcmCarBrand>>('/cms/master/carBrand/update', payload)
}

export function apiToggleStatusCarBrand(
  payload: IGcmCarBrandToggleStatusPayload
): Promise<APIBaseResponse<IGcmCarBrand>> {
  //  // return dummyToggleStatusCarBrand()

  return api.post<IGcmCarBrand, APIBaseResponse<IGcmCarBrand>>('/cms/master/carBrand/toggleFlagActive', payload)
}

export function apiDeleteCarBrand(payload: IGcmCarBrandDeletePayload): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteCarBrand()

  return api.post<any, APIBaseResponse<any>>('/cms/master/carBrand/delete', payload)
}
