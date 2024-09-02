import { IPaginationParams, ISearchParams } from './api'

export interface IGcmCarBrand {
  noSr: string
  descGcm: string
  dtUpload: string
  flagActive: boolean
}

export interface IGcmCarBrandCreateForm {
  descGcm: string
}

export interface IGcmCarBrandUpdateForm {
  noSr: string
  descGcm: string
}

export interface IGcmCarBrandListParams extends ISearchParams, IPaginationParams {}

export interface IGcmCarBrandDetailParams {
  noSr: string
}

export interface IGcmCarBrandCreatePayload {
  descGcm: string
}

export interface IGcmCarBrandUpdatePayload {
  noSr: string
  descGcm: string
}

export interface IGcmCarBrandToggleStatusPayload {
  noSr: string
  flagActive: boolean
}

export interface IGcmCarBrandDeletePayload {
  noSr: string
  flagActive: boolean
}
