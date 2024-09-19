import { AxiosError } from 'axios'
import { apiGetUserDetail, apiGetUserList, apiGetVerificationUserDetail, apiGetVerificationUserList } from './api'
import { APIBaseResponse, IDefaultParams } from '@interfaces/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { IUserData, IVerificationUserData, IVerificationUserResponse } from '@interfaces/user-management'

// Custom hook to get user list
export const useGetUserList = (params?: IDefaultParams): UseQueryResult<APIBaseResponse<IUserData[]>, AxiosError> => {
  return useQuery<APIBaseResponse<IUserData[]>, AxiosError>({
    queryKey: ['userList', params],
    queryFn: () => apiGetUserList(params),
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    placeholderData: previousData => previousData, // Use previous data as a placeholder
  })
}

// Custom hook to get verification user list
export const useGetVerificationUserList = (
  params?: IDefaultParams
): UseQueryResult<APIBaseResponse<IVerificationUserData[]>, AxiosError> => {
  return useQuery<APIBaseResponse<IVerificationUserData[]>, AxiosError>({
    queryKey: ['verificationUserList', params],
    queryFn: () => apiGetVerificationUserList(params),
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    placeholderData: previousData => previousData, // Use previous data as a placeholder
  })
}

// Custom hook to get user detail by ID
export const useGetUserDetail = (idUser: string) => {
  return useQuery<APIBaseResponse<IUserData>, AxiosError>({
    queryKey: ['userDetail', idUser],
    queryFn: () => apiGetUserDetail(idUser),
    enabled: !!idUser, // Fetch only if idUser is provided
  })
}

// Custom hook to get verification user detail by ID
export const useGetVerificationUserDetail = (idUser: string) => {
  return useQuery<APIBaseResponse<IVerificationUserResponse>, AxiosError>({
    queryKey: ['verificationUserDetail', idUser],
    queryFn: () => apiGetVerificationUserDetail(idUser),
    enabled: !!idUser, // Fetch only if idUser is provided
  })
}
