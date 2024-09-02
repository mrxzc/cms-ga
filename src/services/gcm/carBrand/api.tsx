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
import {
  dummyCreateCarBrand,
  dummyDeleteCarBrand,
  dummyGetCarBrand,
  dummyGetCarBrandDetail,
  dummyToggleStatusCarBrand,
  dummyUpdateCarBrand,
} from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetCarBrand(
  params: IGcmCarBrandListParams,
  idUser: string
): Promise<APIBaseResponse<IGcmCarBrand[]>> {
  return dummyGetCarBrand()

  const headers = {
    idUser,
  }
  return api.get<IGcmCarBrand[], APIBaseResponse<IGcmCarBrand[]>>('/cms/master/carBrand/list', { params, headers })
}

export function apiGetCarBrandDetail(
  params: IGcmCarBrandDetailParams,
  idUser: string
): Promise<APIBaseResponse<IGcmCarBrand>> {
  return dummyGetCarBrandDetail()

  const headers = {
    idUser,
  }
  return api.get<IGcmCarBrand, APIBaseResponse<IGcmCarBrand>>('/cms/master/carBrand/detail', { params, headers })
}

export function apiCreateCarBrand(
  payload: IGcmCarBrandCreatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarBrand>> {
  return dummyCreateCarBrand()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarBrand, APIBaseResponse<IGcmCarBrand>>('/cms/master/carBrand/create', payload, { headers })
}

export function apiUpdateCarBrand(
  payload: IGcmCarBrandUpdatePayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarBrand>> {
  return dummyUpdateCarBrand()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarBrand, APIBaseResponse<IGcmCarBrand>>('/cms/master/carBrand/update', payload, { headers })
}

export function apiToggleStatusCarBrand(
  payload: IGcmCarBrandToggleStatusPayload,
  idUser: string
): Promise<APIBaseResponse<IGcmCarBrand>> {
  return dummyToggleStatusCarBrand()

  const headers = {
    idUser,
  }
  return api.post<IGcmCarBrand, APIBaseResponse<IGcmCarBrand>>('/cms/master/carBrand/toggleFlagActive', payload, {
    headers,
  })
}

export function apiDeleteCarBrand(payload: IGcmCarBrandDeletePayload, idUser: string): Promise<APIBaseResponse<{}>> {
  return dummyDeleteCarBrand()

  const headers = {
    idUser,
  }
  return api.post<{}, APIBaseResponse<{}>>('/cms/master/carBrand/delete', payload, { headers })
}
