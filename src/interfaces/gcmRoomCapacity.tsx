import { IPaginationParams, ISearchParams } from './api'

export interface IGcmRoomCapacity {
  noSr: string
  descGcm: string
  dtUpload: string
  flagActive: boolean
}

export interface IGcmRoomCapacityCreateForm {
  descGcm: string
}

export interface IGcmRoomCapacityUpdateForm {
  noSr: string
  descGcm: string
}

export interface IGcmRoomCapacityListParams extends ISearchParams, IPaginationParams {}

export interface IGcmRoomCapacityDetailParams {
  noSr: string
}

export interface IGcmRoomCapacityCreatePayload {
  descGcm: string
}

export interface IGcmRoomCapacityUpdatePayload {
  noSr: string
  descGcm: string
}

export interface IGcmRoomCapacityToggleStatusPayload {
  noSr: string
  flagActive: boolean
}

export interface IGcmRoomCapacityDeletePayload {
  noSr: string
  flagActive: boolean
}
