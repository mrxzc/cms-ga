import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementCleaningServiceDetail,
  IBuildingManagementCleaningServiceDetailParams,
  IBuildingManagementCleaningServiceList,
  IBuildingManagementCleaningServiceListParams,
} from '@interfaces/building-management-cleaning-service'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetBuildingManagementCleaningServiceDetail, dummyGetBuildingManagementCleaningServiceList } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetBuildingManagementCleaningServiceList(
  params: IBuildingManagementCleaningServiceListParams
): Promise<APIBaseResponse<IBuildingManagementCleaningServiceList[]>> {
  // return dummyGetBuildingManagementCleaningServiceList()

  return api.get<IBuildingManagementCleaningServiceList[], APIBaseResponse<IBuildingManagementCleaningServiceList[]>>(
    '/cms/master/buildingManagement/cleaningService/list',
    {
      params,
    }
  )
}

export function apiGetBuildingManagementCleaningServiceDetail(
  params: IBuildingManagementCleaningServiceDetailParams
): Promise<APIBaseResponse<IBuildingManagementCleaningServiceDetail>> {
  // return dummyGetBuildingManagementCleaningServiceDetail()

  return api.get<IBuildingManagementCleaningServiceDetail, APIBaseResponse<IBuildingManagementCleaningServiceDetail>>(
    '/cms/master/buildingManagement/cleaningService/detail',
    {
      params,
    }
  )
}
