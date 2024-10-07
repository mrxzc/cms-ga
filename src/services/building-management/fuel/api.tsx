import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementFuelDetail,
  IBuildingManagementFuelDetailParams,
  IBuildingManagementFuelList,
  IBuildingManagementFuelListParams,
} from '@interfaces/building-management-fuel'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetBuildingManagementFuelDetail, dummyGetBuildingManagementFuelList } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetBuildingManagementFuelList(
  params: IBuildingManagementFuelListParams
): Promise<APIBaseResponse<IBuildingManagementFuelList[]>> {
  // return dummyGetBuildingManagementFuelList()

  return api.get<IBuildingManagementFuelList[], APIBaseResponse<IBuildingManagementFuelList[]>>(
    '/cms/master/buildingManagement/bbm/list',
    {
      params,
    }
  )
}

export function apiGetBuildingManagementFuelDetail(
  params: IBuildingManagementFuelDetailParams
): Promise<APIBaseResponse<IBuildingManagementFuelDetail>> {
  // return dummyGetBuildingManagementFuelDetail()

  return api.get<IBuildingManagementFuelDetail, APIBaseResponse<IBuildingManagementFuelDetail>>(
    '/cms/master/buildingManagement/bbm/detail',
    {
      params,
    }
  )
}
