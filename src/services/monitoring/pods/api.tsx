import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringPodsList,
  IMonitoringPodsDetail,
  IGetListPodsParams,
  IGetDetailPodsParams,
} from '@interfaces/monitoringPods'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
import { dummyGetDetailPods, dummyGetListPods } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListPods(params: IGetListPodsParams): Promise<APIBaseResponse<IMonitoringPodsList[]>> {
  return dummyGetListPods()

  return api.get<IMonitoringPodsList[], APIBaseResponse<IMonitoringPodsList[]>>('/cms/master/monitoring/pods/list', {
    params,
  })
}

export function apiGetDetailPods(params: IGetDetailPodsParams): Promise<APIBaseResponse<IMonitoringPodsDetail>> {
  return dummyGetDetailPods()

  return api.get<IMonitoringPodsDetail, APIBaseResponse<IMonitoringPodsDetail>>('/cms/master/monitoring/pods/detail', {
    params,
  })
}
