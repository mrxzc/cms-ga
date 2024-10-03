import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementWasteManagementDetail,
  IBuildingManagementWasteManagementDetailParams,
  IBuildingManagementWasteManagementList,
  IBuildingManagementWasteManagementListParams,
} from '@interfaces/building-management-waste-management'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetBuildingManagementWasteManagementDetail, dummyGetBuildingManagementWasteManagementList } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetBuildingManagementWasteManagementList(
  params: IBuildingManagementWasteManagementListParams
): Promise<APIBaseResponse<IBuildingManagementWasteManagementList[]>> {
  // return dummyGetBuildingManagementWasteManagementList()

  return api.get<IBuildingManagementWasteManagementList[], APIBaseResponse<IBuildingManagementWasteManagementList[]>>(
    '/cms/master/buildingManagement/wasteManagement/list',
    {
      params,
    }
  )
}

export function apiGetBuildingManagementWasteManagementDetail(
  params: IBuildingManagementWasteManagementDetailParams
): Promise<APIBaseResponse<IBuildingManagementWasteManagementDetail>> {
  // return dummyGetBuildingManagementWasteManagementDetail()

  return api.get<IBuildingManagementWasteManagementDetail, APIBaseResponse<IBuildingManagementWasteManagementDetail>>(
    '/cms/master/buildingManagement/wasteManagement/detail',
    {
      params,
    }
  )
}
