import { IPaginationParams, ISearchParams } from './api'

export interface IGcmCarFuel {
  noSr: string
  descGcm: string
  dtUpload: string
  flagActive: boolean
}

export interface IGcmCarFuelCreateForm {
  descGcm: string
}

export interface IGcmCarFuelUpdateForm {
  noSr: string
  descGcm: string
}

export interface IGcmCarFuelListParams extends ISearchParams, IPaginationParams {}

export interface IGcmCarFuelDetailParams {
  noSr: string
}

export interface IGcmCarFuelCreatePayload {
  descGcm: string
}

export interface IGcmCarFuelUpdatePayload {
  noSr: string
  descGcm: string
}

export interface IGcmCarFuelToggleStatusPayload {
  noSr: string
  flagActive: boolean
}

export interface IGcmCarFuelDeletePayload {
  noSr: string
  flagActive: boolean
}
