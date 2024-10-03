import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementSecurityGuardDetail,
  IBuildingManagementSecurityGuardDetailParams,
  IBuildingManagementSecurityGuardList,
  IBuildingManagementSecurityGuardListParams,
} from '@interfaces/building-management-security-guard'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyGetSecurityGuardDetail, dummyGetSecurityGuardList } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetSecurityGuardList(
  params: IBuildingManagementSecurityGuardListParams
): Promise<APIBaseResponse<IBuildingManagementSecurityGuardList[]>> {
  // return dummyGetSecurityGuardList()

  return api.get<IBuildingManagementSecurityGuardList[], APIBaseResponse<IBuildingManagementSecurityGuardList[]>>(
    '/cms/master/buildingManagement/securityGuard/list',
    {
      params,
    }
  )
}

export function apiGetSecurityGuardDetail(
  params: IBuildingManagementSecurityGuardDetailParams
): Promise<APIBaseResponse<IBuildingManagementSecurityGuardDetail>> {
  // return dummyGetSecurityGuardDetail()

  return api.get<IBuildingManagementSecurityGuardDetail, APIBaseResponse<IBuildingManagementSecurityGuardDetail>>(
    '/cms/master/buildingManagement/securityGuard/detail',
    {
      params,
    }
  )
}
