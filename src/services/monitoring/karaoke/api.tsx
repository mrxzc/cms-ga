import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringKaraokeList,
  IMonitoringKaraokeDetail,
  IGetListKaraokeParams,
  IGetDetailKaraokeParams,
} from '@interfaces/monitoringKaraoke'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
import { dummyGetDetailKaraoke, dummyGetListKaraoke } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListKaraoke(params: IGetListKaraokeParams): Promise<APIBaseResponse<IMonitoringKaraokeList[]>> {
  return dummyGetListKaraoke()

  return api.get<IMonitoringKaraokeList[], APIBaseResponse<IMonitoringKaraokeList[]>>(
    '/cms/master/monitoring/karaoke/list',
    {
      params,
    }
  )
}

export function apiGetDetailKaraoke(
  params: IGetDetailKaraokeParams
): Promise<APIBaseResponse<IMonitoringKaraokeDetail>> {
  return dummyGetDetailKaraoke()

  return api.get<IMonitoringKaraokeDetail, APIBaseResponse<IMonitoringKaraokeDetail>>(
    '/cms/master/monitoring/karaoke/detail',
    {
      params,
    }
  )
}
