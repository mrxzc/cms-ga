import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementCleaningServiceDetail,
  IBuildingManagementCleaningServiceDetailParams,
  IBuildingManagementCleaningServiceList,
  IBuildingManagementCleaningServiceListParams,
} from '@interfaces/building-management-cleaning-service'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
import { dummyGetCleaningServiceDetail, dummyGetCleaningServiceList } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetCleaningServiceList(
  params: IBuildingManagementCleaningServiceListParams
): Promise<APIBaseResponse<IBuildingManagementCleaningServiceList[]>> {
  return dummyGetCleaningServiceList()

  return api.get<IBuildingManagementCleaningServiceList[], APIBaseResponse<IBuildingManagementCleaningServiceList[]>>(
    '/cms/master/buildingManagement/cleaningService/list',
    {
      params,
    }
  )
}

export function apiGetCleaningServiceDetail(
  params: IBuildingManagementCleaningServiceDetailParams
): Promise<APIBaseResponse<IBuildingManagementCleaningServiceDetail>> {
  return dummyGetCleaningServiceDetail()

  return api.get<IBuildingManagementCleaningServiceDetail, APIBaseResponse<IBuildingManagementCleaningServiceDetail>>(
    '/cms/master/buildingManagement/cleaningService/detail',
    {
      params,
    }
  )
}
