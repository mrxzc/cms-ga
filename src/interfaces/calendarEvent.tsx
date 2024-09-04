import { IPaginationParams, ISearchParams } from './api'

export interface ICalendarEventList {
  noIdInfo: number
  title: string
  dtUpload: string
  flagActive: boolean
  flagShow: boolean
}

export interface ICalendarEventDetail {
  noIdInfo: number
  title: string
  description: string
  dtUpload: string
  flagActive: boolean
  flagShow: boolean
  image: string
}

export interface ICalendarEventCreateForm {
  title: string
  description?: string | undefined | null
  image: string
  flagActive: boolean
  flagShow: boolean
}

export interface ICalendarEventUpdateForm {
  title: string
  description?: string | undefined | null
  image: string
  flagActive: boolean
  flagShow: boolean
}

export interface ICalendarEventListParams extends ISearchParams, IPaginationParams {
  startDate?: string
  endDate?: string
}

export interface ICalendarEventDetailParams {
  noIdInfo?: number
}

export interface ICalendarEventCreatePayload extends ICalendarEventCreateForm {}

export interface ICalendarEventUpdatePayload extends ICalendarEventUpdateForm {
  noIdInfo: number
}

export interface IUploadImageCalendarEventPayload {
  noIdInfo: number
  file: File
}

export interface ICalendarEventDeletePayload {
  noIdInfo: number
}
