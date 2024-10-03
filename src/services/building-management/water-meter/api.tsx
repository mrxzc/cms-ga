import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementWaterMeterDetail,
  IBuildingManagementWaterMeterDetailParams,
  IBuildingManagementWaterMeterList,
  IBuildingManagementWaterMeterListParams,
} from '@interfaces/building-management-water-meter'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetBuildingManagementWaterMeterDetail, dummyGetBuildingManagementWaterMeterList } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetBuildingManagementWaterMeterList(
  params: IBuildingManagementWaterMeterListParams
): Promise<APIBaseResponse<IBuildingManagementWaterMeterList[]>> {
  // return dummyGetBuildingManagementWaterMeterList()

  return api.get<IBuildingManagementWaterMeterList[], APIBaseResponse<IBuildingManagementWaterMeterList[]>>(
    '/cms/master/buildingManagement/waterMeter/list',
    {
      params,
    }
  )
}

export function apiGetBuildingManagementWaterMeterDetail(
  params: IBuildingManagementWaterMeterDetailParams
): Promise<APIBaseResponse<IBuildingManagementWaterMeterDetail>> {
  // return dummyGetBuildingManagementWaterMeterDetail()

  return api.get<IBuildingManagementWaterMeterDetail, APIBaseResponse<IBuildingManagementWaterMeterDetail>>(
    '/cms/master/buildingManagement/waterMeter/detail',
    {
      params,
    }
  )
}
