import { API_ACCOUNT } from '@utils/environment'
import { APIBaseResponse } from '@interfaces/api'
import { ILoginResponse, LoginCredentials, OTPCredential, IOTPLoginResponse, IProfile } from '@interfaces/auth'
import httpRequest from '@utils/helper'

const api = httpRequest(API_ACCOUNT)

export function apiPostLogin(data: LoginCredentials) {
  return api.post<ILoginResponse, APIBaseResponse<ILoginResponse>>('/auth/loginMobile', data)
}

export function apiPostOTPLogin(data: OTPCredential) {
  return api.post<IOTPLoginResponse, APIBaseResponse<IOTPLoginResponse>>('/auth/loginMobile/verifyOtp', data)
}

export function apiPostRegister(data: any) {
  return api.post<boolean, APIBaseResponse<boolean>>('/auth/registerMobile', data)
}

export function apiPostOTPRegister(data: OTPCredential) {
  return api.post<boolean, APIBaseResponse<boolean>>('/auth/registerMobile/verifyOtp', data)
}

export function apiPostForgotPassword(data: any) {
  return api.post<boolean, APIBaseResponse<boolean>>('/auth/forgotPasswordMobile/changePassword', data)
}

export function apiPostSendOTPForgot(data: any) {
  return api.post<string, APIBaseResponse<string>>('/auth/forgotPasswordMobile/sendOtp', data)
}

export function apiPostVerifyOTPForgot(data: any) {
  return api.post<string, APIBaseResponse<string>>('/auth/forgotPasswordMobile/verifyOtp', data)
}

export function apiProfile(): Promise<APIBaseResponse<IProfile>> {
  return api.get<IProfile, APIBaseResponse<IProfile>>('/auth/profile')
}
