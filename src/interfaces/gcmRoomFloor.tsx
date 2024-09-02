import { IPaginationParams, ISearchParams } from './api'

export interface IGcmRoomFloor {
  noSr: string
  descGcm: string
  dtUpload: string
  flagActive: boolean
}

export interface IGcmRoomFloorCreateForm {
  descGcm: string
}

export interface IGcmRoomFloorUpdateForm {
  noSr: string
  descGcm: string
}

export interface IGcmRoomFloorListParams extends ISearchParams, IPaginationParams {}

export interface IGcmRoomFloorDetailParams {
  noSr: string
}

export interface IGcmRoomFloorCreatePayload {
  descGcm: string
}

export interface IGcmRoomFloorUpdatePayload {
  noSr: string
  descGcm: string
}

export interface IGcmRoomFloorToggleStatusPayload {
  noSr: string
  flagActive: boolean
}

export interface IGcmRoomFloorDeletePayload {
  noSr: string
  flagActive: boolean
}
