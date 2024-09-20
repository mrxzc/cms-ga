import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringAssetList,
  IMonitoringAssetDetail,
  IGetListAssetParams,
  IGetDetailAssetParams,
} from '@interfaces/monitoringAsset'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetDetailAsset, dummyGetListAsset } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListAsset(params: IGetListAssetParams): Promise<APIBaseResponse<IMonitoringAssetList[]>> {
  // return dummyGetListAsset()

  return api.get<IMonitoringAssetList[], APIBaseResponse<IMonitoringAssetList[]>>('/cms/master/monitoring/asset/list', {
    params,
  })
}

export function apiGetDetailAsset(params: IGetDetailAssetParams): Promise<APIBaseResponse<IMonitoringAssetDetail>> {
  // return dummyGetDetailAsset()

  return api.get<IMonitoringAssetDetail, APIBaseResponse<IMonitoringAssetDetail>>(
    '/cms/master/monitoring/asset/detail',
    {
      params,
    }
  )
}
