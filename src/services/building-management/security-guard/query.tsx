import {
  IBuildingManagementSecurityGuardDetailParams,
  IBuildingManagementSecurityGuardListParams,
} from '@interfaces/building-management-security-guard'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetBuildingManagementSecurityGuardDetail, apiGetBuildingManagementSecurityGuardList } from './api'

// Get Security Guard List
export const useGetBuildingManagementSecurityGuardList = (params: IBuildingManagementSecurityGuardListParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/securityGuard/list', params],
    queryFn: async () => {
      return apiGetBuildingManagementSecurityGuardList(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}

// Get Security Guard Detail
export const useGetBuildingManagementSecurityGuardDetail = (params: IBuildingManagementSecurityGuardDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/securityGuard/detail', params],
    queryFn: async () => {
      return apiGetBuildingManagementSecurityGuardDetail(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}
