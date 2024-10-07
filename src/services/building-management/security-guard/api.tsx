import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementSecurityGuardDetail,
  IBuildingManagementSecurityGuardDetailParams,
  IBuildingManagementSecurityGuardList,
  IBuildingManagementSecurityGuardListParams,
} from '@interfaces/building-management-security-guard'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetBuildingManagementSecurityGuardDetail, dummyGetBuildingManagementSecurityGuardList } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetBuildingManagementSecurityGuardList(
  params: IBuildingManagementSecurityGuardListParams
): Promise<APIBaseResponse<IBuildingManagementSecurityGuardList[]>> {
  // return dummyGetBuildingManagementSecurityGuardList()

  return api.get<IBuildingManagementSecurityGuardList[], APIBaseResponse<IBuildingManagementSecurityGuardList[]>>(
    '/cms/master/buildingManagement/securityGuard/list',
    {
      params,
    }
  )
}

export function apiGetBuildingManagementSecurityGuardDetail(
  params: IBuildingManagementSecurityGuardDetailParams
): Promise<APIBaseResponse<IBuildingManagementSecurityGuardDetail>> {
  // return dummyGetBuildingManagementSecurityGuardDetail()

  return api.get<IBuildingManagementSecurityGuardDetail, APIBaseResponse<IBuildingManagementSecurityGuardDetail>>(
    '/cms/master/buildingManagement/securityGuard/detail',
    {
      params,
    }
  )
}
