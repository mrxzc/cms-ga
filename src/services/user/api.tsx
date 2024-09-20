import { APIBaseResponse, IDefaultParams } from '@interfaces/api'
import {
  IApprovalPayload,
  IApprovalResponse,
  IUpdateUserPayload,
  IUserCreatePayload,
  IUserCreateResponse,
  IUserData,
  IVerificationUserData,
  IVerificationUserResponse,
} from '@interfaces/user-management'
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

export function apiGetUserDetail(idUser: string): Promise<APIBaseResponse<IUserData>> {
  return api.get<IUserData, APIBaseResponse<IUserData>>(`/cms/master/userManagement/detail`, {
    params: { idUser },
  })
}

export function apiGetVerificationUserDetail(idUser: string): Promise<APIBaseResponse<IVerificationUserResponse>> {
  return api.get<IVerificationUserResponse, APIBaseResponse<IVerificationUserResponse>>(
    `/cms/userVerification/detail`,
    {
      params: { idUser },
    }
  )
}

export function apiCreateUser(payload: IUserCreatePayload): Promise<APIBaseResponse<IUserCreateResponse>> {
  return api.post<IUserCreateResponse, APIBaseResponse<IUserCreateResponse>>('/cms/master/user/create', payload)
}

export function apiUpdateUser(payload: IUpdateUserPayload): Promise<APIBaseResponse<IUserData>> {
  return api.post<IUserData, APIBaseResponse<IUserData>>('/cms/master/userManagement/update', payload)
}

export function apiApproveUser(payload: IApprovalPayload): Promise<APIBaseResponse<IApprovalResponse>> {
  return api.post<IApprovalResponse, APIBaseResponse<IApprovalResponse>>('/cms/userVerification/approval', payload)
}
