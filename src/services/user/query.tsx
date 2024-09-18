import { AxiosError } from 'axios'
import { apiGetUserList, apiGetVerificationUserList } from './api'
import { APIBaseResponse, IDefaultParams } from '@interfaces/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { IUserData, IVerificationUserData } from '@interfaces/user-management'

export const useGetUserList = (params?: IDefaultParams): UseQueryResult<APIBaseResponse<IUserData[]>, AxiosError> => {
  return useQuery({
    queryKey: ['userList', params],
    queryFn: () => apiGetUserList(params),
    staleTime: 5 * 60 * 1000, // 5 menit (data dianggap valid selama 5 menit)
    placeholderData: previousData => previousData, // Gunakan data sebelumnya sebagai placeholder saat fetching ulang
  })
}

export const useGetVerificationUserList = (
  params?: IDefaultParams
): UseQueryResult<APIBaseResponse<IVerificationUserData[]>, AxiosError> => {
  return useQuery({
    queryKey: ['userList', params],
    queryFn: () => apiGetVerificationUserList(params),
    staleTime: 5 * 60 * 1000, // 5 menit (data dianggap valid selama 5 menit)
    placeholderData: previousData => previousData, // Gunakan data sebelumnya sebagai placeholder saat fetching ulang
  })
}
