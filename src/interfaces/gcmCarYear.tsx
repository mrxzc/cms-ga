import { IPaginationParams, ISearchParams } from './api'

export interface IGcmCarYear {
  noSr: string
  descGcm: string
  dtUpload: string
  flagActive: boolean
}

export interface IGcmCarYearCreateForm {
  descGcm: string
}

export interface IGcmCarYearUpdateForm {
  noSr: string
  descGcm: string
}

export interface IGcmCarYearListParams extends ISearchParams, IPaginationParams {}

export interface IGcmCarYearDetailParams {
  noSr: string
}

export interface IGcmCarYearCreatePayload {
  descGcm: string
}

export interface IGcmCarYearUpdatePayload {
  noSr: string
  descGcm: string
}

export interface IGcmCarYearToggleStatusPayload {
  noSr: string
  flagActive: boolean
}

export interface IGcmCarYearDeletePayload {
  noSr: string
  flagActive: boolean
}
