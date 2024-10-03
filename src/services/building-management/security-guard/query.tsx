import {
  IBuildingManagementSecurityGuardDetailParams,
  IBuildingManagementSecurityGuardListParams,
} from '@interfaces/building-management-security-guard'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetSecurityGuardDetail, apiGetSecurityGuardList } from './api'

// Get Security Guard List
export const useGetSecurityGuardList = (params: IBuildingManagementSecurityGuardListParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/securityGuard/list', params],
    queryFn: async () => {
      return apiGetSecurityGuardList(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}

// Get Security Guard Detail
export const useGetSecurityGuardDetail = (params: IBuildingManagementSecurityGuardDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/securityGuard/detail', params],
    queryFn: async () => {
      return apiGetSecurityGuardDetail(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}
