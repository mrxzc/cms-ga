import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringBallroomList,
  IMonitoringBallroomDetail,
  IGetListBallroomParams,
  IGetDetailBallroomParams,
} from '@interfaces/monitoringBallroom'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetDetailBallroom, dummyGetListBallroom } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListBallroom(
  params: IGetListBallroomParams
): Promise<APIBaseResponse<IMonitoringBallroomList[]>> {
  // return dummyGetListBallroom()

  return api.get<IMonitoringBallroomList[], APIBaseResponse<IMonitoringBallroomList[]>>(
    '/cms/master/monitoring/ballroom/list',
    {
      params,
    }
  )
}

export function apiGetDetailBallroom(
  params: IGetDetailBallroomParams
): Promise<APIBaseResponse<IMonitoringBallroomDetail>> {
  // return dummyGetDetailBallroom()

  return api.get<IMonitoringBallroomDetail, APIBaseResponse<IMonitoringBallroomDetail>>(
    '/cms/master/monitoring/ballroom/detail',
    {
      params,
    }
  )
}
