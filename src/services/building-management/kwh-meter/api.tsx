import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementKWHMeterDetail,
  IBuildingManagementKWHMeterDetailParams,
  IBuildingManagementKWHMeterList,
  IBuildingManagementKWHMeterListParams,
} from '@interfaces/building-management-kwh-meter'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetBuildingManagementKWHMeterDetail, dummyGetBuildingManagementKWHMeterList } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetBuildingManagementKWHMeterList(
  params: IBuildingManagementKWHMeterListParams
): Promise<APIBaseResponse<IBuildingManagementKWHMeterList[]>> {
  // return dummyGetBuildingManagementKWHMeterList()

  return api.get<IBuildingManagementKWHMeterList[], APIBaseResponse<IBuildingManagementKWHMeterList[]>>(
    '/cms/master/buildingManagement/kwhMeter/list',
    {
      params,
    }
  )
}

export function apiGetBuildingManagementKWHMeterDetail(
  params: IBuildingManagementKWHMeterDetailParams
): Promise<APIBaseResponse<IBuildingManagementKWHMeterDetail>> {
  // return dummyGetBuildingManagementKWHMeterDetail()

  return api.get<IBuildingManagementKWHMeterDetail, APIBaseResponse<IBuildingManagementKWHMeterDetail>>(
    '/cms/master/buildingManagement/kwhMeter/detail',
    {
      params,
    }
  )
}
