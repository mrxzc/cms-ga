import { APIBaseResponse, IPaginationParams } from '@interfaces/api'
import {
  IPayloadCreateTimeLimit,
  IPayloadUpdateTimeLimit,
  IResponseUpdateTimeLimit,
  ITimeLimit,
} from '@interfaces/time-limit'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetDetailRoom, dummyGetListRoom, dummyGetRoomBookingTime, dummySubmitBookingRoom } from './dummies'

const api = httpRequest(API_MASTER)

export function apiGetTimeLimit(params?: IPaginationParams): Promise<APIBaseResponse<ITimeLimit[]>> {
  return api.get<ITimeLimit[], APIBaseResponse<ITimeLimit[]>>('/cms/master/timeLimit/list', { params })
}

export function apiCreateTimeLimit(
  payload: IPayloadCreateTimeLimit
): Promise<APIBaseResponse<IResponseUpdateTimeLimit>> {
  return api.post<IResponseUpdateTimeLimit, APIBaseResponse<IResponseUpdateTimeLimit>>(
    '/cms/master/timeLimit/create',
    payload
  )
}

export function apiUpdateTimeLimit(
  payload: IPayloadUpdateTimeLimit
): Promise<APIBaseResponse<IResponseUpdateTimeLimit>> {
  return api.put<IResponseUpdateTimeLimit, APIBaseResponse<IResponseUpdateTimeLimit>>(
    '/cms/master/timeLimit/update',
    payload
  )
}

// export function apiGetDetailRoom(params?: IRoomDetailParams): Promise<APIBaseResponse<IRoomDetail>> {
//   return api.get<IRoomDetail, APIBaseResponse<IRoomDetail>>('/room/detail', { params })
// }
