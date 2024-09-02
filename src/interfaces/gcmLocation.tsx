import { IPaginationParams, ISearchParams } from './api'

export interface IGcmLocation {
  noSr: string
  descGcm: string
  dtUpload: string
  flagActive: boolean
}

export interface IGcmLocationCreateForm {
  descGcm: string
}

export interface IGcmLocationUpdateForm {
  noSr: string
  descGcm: string
}

export interface IGcmLocationListParams extends ISearchParams, IPaginationParams {}

export interface IGcmLocationDetailParams {
  noSr: string
}

export interface IGcmLocationCreatePayload {
  descGcm: string
}

export interface IGcmLocationUpdatePayload {
  noSr: string
  descGcm: string
}

export interface IGcmLocationToggleStatusPayload {
  noSr: string
  flagActive: boolean
}

export interface IGcmLocationDeletePayload {
  noSr: string
  flagActive: boolean
}
