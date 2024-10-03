import {
  IBuildingManagementKWHMeterDetailParams,
  IBuildingManagementKWHMeterListParams,
} from '@interfaces/building-management-kwh-meter'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetBuildingManagementKWHMeterDetail, apiGetBuildingManagementKWHMeterList } from './api'

// Get KWH Meter List
export const useGetBuildingManagementKWHMeterList = (params: IBuildingManagementKWHMeterListParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/kwhMeter/list', params],
    queryFn: async () => {
      return apiGetBuildingManagementKWHMeterList(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}

// Get KWH Meter Detail
export const useGetBuildingManagementKWHMeterDetail = (params: IBuildingManagementKWHMeterDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/kwhMeter/detail', params],
    queryFn: async () => {
      return apiGetBuildingManagementKWHMeterDetail(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}
