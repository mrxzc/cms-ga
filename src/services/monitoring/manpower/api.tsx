import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringManpowerList,
  IMonitoringManpowerDetail,
  IGetListManpowerParams,
  IGetDetailManpowerParams,
} from '@interfaces/monitoringManpower'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
import { dummyGetDetailManpower, dummyGetListManpower } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListManpower(
  params: IGetListManpowerParams
): Promise<APIBaseResponse<IMonitoringManpowerList[]>> {
  return dummyGetListManpower()

  return api.get<IMonitoringManpowerList[], APIBaseResponse<IMonitoringManpowerList[]>>(
    '/cms/master/monitoring/manpower/list',
    {
      params,
    }
  )
}

export function apiGetDetailManpower(
  params: IGetDetailManpowerParams
): Promise<APIBaseResponse<IMonitoringManpowerDetail>> {
  return dummyGetDetailManpower()

  return api.get<IMonitoringManpowerDetail, APIBaseResponse<IMonitoringManpowerDetail>>(
    '/cms/master/monitoring/manpower/detail',
    {
      params,
    }
  )
}
