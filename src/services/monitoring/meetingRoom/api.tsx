import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringMeetingRoomList,
  IMonitoringMeetingRoomDetail,
  IGetListMeetingRoomParams,
  IGetDetailMeetingRoomParams,
} from '@interfaces/monitoringMeetingRoom'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetDetailMeetingRoom, dummyGetListMeetingRoom } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListMeetingRoom(
  params: IGetListMeetingRoomParams
): Promise<APIBaseResponse<IMonitoringMeetingRoomList[]>> {
  // return dummyGetListMeetingRoom()

  return api.get<IMonitoringMeetingRoomList[], APIBaseResponse<IMonitoringMeetingRoomList[]>>(
    '/cms/master/monitoring/meetingRoom/list',
    {
      params,
    }
  )
}

export function apiGetDetailMeetingRoom(
  params: IGetDetailMeetingRoomParams
): Promise<APIBaseResponse<IMonitoringMeetingRoomDetail>> {
  // return dummyGetDetailMeetingRoom()

  return api.get<IMonitoringMeetingRoomDetail, APIBaseResponse<IMonitoringMeetingRoomDetail>>(
    '/cms/master/monitoring/meetingRoom/detail',
    {
      params,
    }
  )
}
