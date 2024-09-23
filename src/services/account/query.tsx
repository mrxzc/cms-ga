import { AxiosError } from 'axios'
import { apiGetRoleList, apiGetUserManagementList } from './api' // Pastikan path import sudah benar
import { APIBaseResponse, IDefaultParams } from '@interfaces/api'
import { IRoleManagementData, IUserManagementData } from '@interfaces/account-management' // Pastikan path import sudah benar
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useGetRoleList = (
  params?: IDefaultParams
): UseQueryResult<APIBaseResponse<IRoleManagementData[]>, AxiosError> => {
  return useQuery({
    queryKey: ['roleList', params],
    queryFn: () => apiGetRoleList(params),
    staleTime: 5 * 60 * 1000, // 5 menit (data dianggap valid selama 5 menit)
    placeholderData: previousData => previousData, // Gunakan data sebelumnya sebagai placeholder saat fetching ulang
  })
}

export const useGetUserManagementList = (
  params?: IDefaultParams
): UseQueryResult<APIBaseResponse<IUserManagementData[]>, AxiosError> => {
  return useQuery({
    queryKey: ['userManagementList', params],
    queryFn: () => apiGetUserManagementList(params),
    staleTime: 5 * 60 * 1000, // 5 menit (data dianggap valid selama 5 menit)
    placeholderData: previousData => previousData, // Gunakan data sebelumnya sebagai placeholder saat fetching ulang
  })
}
