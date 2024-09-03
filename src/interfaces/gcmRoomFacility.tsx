import { IPaginationParams, ISearchParams } from './api'

export interface IGcmRoomFacility {
  noSr: string
  descGcm: string
  dtUpload: string
  flagActive: boolean
}

export interface IGcmRoomFacilityCreateForm {
  descGcm: string
}

export interface IGcmRoomFacilityUpdateForm {
  noSr: string
  descGcm: string
}

export interface IGcmRoomFacilityListParams extends ISearchParams, IPaginationParams {}

export interface IGcmRoomFacilityDetailParams {
  noSr: string
}

export interface IGcmRoomFacilityCreatePayload {
  descGcm: string
}

export interface IGcmRoomFacilityUpdatePayload {
  noSr: string
  descGcm: string
}

export interface IGcmRoomFacilityToggleStatusPayload {
  noSr: string
  flagActive: boolean
}

export interface IGcmRoomFacilityDeletePayload {
  noSr: string
  flagActive: boolean
}
