import {
  IBuildingManagementCleaningServiceDetailParams,
  IBuildingManagementCleaningServiceListParams,
} from '@interfaces/building-management-cleaning-service'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetBuildingManagementCleaningServiceDetail, apiGetBuildingManagementCleaningServiceList } from './api'

// Get Cleaning Service List
export const useGetBuildingManagementCleaningServiceList = (params: IBuildingManagementCleaningServiceListParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/cleaningService/list', params],
    queryFn: async () => {
      return apiGetBuildingManagementCleaningServiceList(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}

// Get Cleaning Service Detail
export const useGetBuildingManagementCleaningServiceDetail = (
  params: IBuildingManagementCleaningServiceDetailParams
) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/cleaningService/detail', params],
    queryFn: async () => {
      return apiGetBuildingManagementCleaningServiceDetail(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}
