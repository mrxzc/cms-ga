import { APIBaseResponse, IDefaultParams } from '@interfaces/api'
import { IUserCreatePayload, IUserCreateResponse, IUserData, IVerificationUserData } from '@interfaces/user-management'
import { API_ACCOUNT } from '@utils/environment'
import httpRequest from '@utils/helper'

const api = httpRequest(API_ACCOUNT)

export function apiGetUserList(params?: IDefaultParams): Promise<APIBaseResponse<IUserData[]>> {
  return api.get<IUserData[], APIBaseResponse<IUserData[]>>('/cms/master/user/list', { params })
}

export function apiGetVerificationUserList(params?: IDefaultParams): Promise<APIBaseResponse<IVerificationUserData[]>> {
  return api.get<IVerificationUserData[], APIBaseResponse<IVerificationUserData[]>>('/cms/userVerification/list', {
    params,
  })
}

export function apiCreateUser(payload: IUserCreatePayload): Promise<APIBaseResponse<IUserCreateResponse>> {
  return api.post<IUserCreateResponse, APIBaseResponse<IUserCreateResponse>>('/cms/master/user/create', payload)
}
