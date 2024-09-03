import { IPaginationParams, ISearchParams } from './api'

export interface IGcmCarType {
  noSr: string
  descGcm: string
  brand: string
  dtUpload: string
  flagActive: boolean
}

export interface IGcmCarTypeCreateForm {
  descGcm: string
}

export interface IGcmCarTypeUpdateForm {
  noSr: string
  descGcm: string
}

export interface IGcmCarTypeListParams extends ISearchParams, IPaginationParams {}

export interface IGcmCarTypeDetailParams {
  noSr: string
}

export interface IGcmCarTypeCreatePayload {
  descGcm: string
}

export interface IGcmCarTypeUpdatePayload {
  noSr: string
  descGcm: string
}

export interface IGcmCarTypeToggleStatusPayload {
  noSr: string
  flagActive: boolean
}

export interface IGcmCarTypeDeletePayload {
  noSr: string
  flagActive: boolean
}
