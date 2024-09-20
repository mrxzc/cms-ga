import { IRoleManagementData, IUserManagementData } from '@interfaces/account-management'
import { APIBaseResponse, IDefaultParams } from '@interfaces/api'
import { API_ACCOUNT } from '@utils/environment'
import httpRequest from '@utils/helper'

const api = httpRequest(API_ACCOUNT)

export function apiGetRoleList(params?: IDefaultParams): Promise<APIBaseResponse<IRoleManagementData[]>> {
  return api.get<IRoleManagementData[], APIBaseResponse<IRoleManagementData[]>>('/cms/master/role/list', { params })
}
export function apiGetUserManagementList(params?: IDefaultParams): Promise<APIBaseResponse<IUserManagementData[]>> {
  return api.get<IUserManagementData[], APIBaseResponse<IUserManagementData[]>>('/cms/master/userManagement/list', {
    params,
  })
}

export async function apiDeleteUser(idUser: string): Promise<APIBaseResponse<null>> {
  return api.post<null, APIBaseResponse<null>>('/cms/master/user/delete', { idUser })
}
