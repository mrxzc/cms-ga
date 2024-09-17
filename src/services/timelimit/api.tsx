import { APIBaseResponse, IPaginationParams } from '@interfaces/api'
import { ITimeLimit } from '@interfaces/time-limit'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetDetailRoom, dummyGetListRoom, dummyGetRoomBookingTime, dummySubmitBookingRoom } from './dummies'

const api = httpRequest(API_MASTER)

export function apiGetTimeLimit(params?: IPaginationParams): Promise<APIBaseResponse<ITimeLimit[]>> {
  return api.get<ITimeLimit[], APIBaseResponse<ITimeLimit[]>>('/cms/master/timeLimit/list', { params })
}

// export function apiGetDetailRoom(params?: IRoomDetailParams): Promise<APIBaseResponse<IRoomDetail>> {
//   return api.get<IRoomDetail, APIBaseResponse<IRoomDetail>>('/room/detail', { params })
// }
