import {
  IBuildingManagementFuelDetailParams,
  IBuildingManagementFuelListParams,
} from '@interfaces/building-management-fuel'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetBuildingManagementFuelDetail, apiGetBuildingManagementFuelList } from './api'

// Get Fuel List
export const useGetBuildingManagementFuelList = (params: IBuildingManagementFuelListParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/bbm/list', params],
    queryFn: async () => {
      return apiGetBuildingManagementFuelList(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}

// Get Fuel Detail
export const useGetBuildingManagementFuelDetail = (params: IBuildingManagementFuelDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/bbm/detail', params],
    queryFn: async () => {
      return apiGetBuildingManagementFuelDetail(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}
