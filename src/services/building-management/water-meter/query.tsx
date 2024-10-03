import {
  IBuildingManagementWaterMeterDetailParams,
  IBuildingManagementWaterMeterListParams,
} from '@interfaces/building-management-water-meter'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetBuildingManagementWaterMeterDetail, apiGetBuildingManagementWaterMeterList } from './api'

// Get Water Meter List
export const useGetBuildingManagementWaterMeterList = (params: IBuildingManagementWaterMeterListParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/waterMeter/list', params],
    queryFn: async () => {
      return apiGetBuildingManagementWaterMeterList(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}

// Get Water Meter Detail
export const useGetBuildingManagementWaterMeterDetail = (params: IBuildingManagementWaterMeterDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/waterMeter/detail', params],
    queryFn: async () => {
      return apiGetBuildingManagementWaterMeterDetail(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}
