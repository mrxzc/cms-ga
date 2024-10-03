import {
  IBuildingManagementCleaningServiceDetailParams,
  IBuildingManagementCleaningServiceListParams,
} from '@interfaces/building-management-cleaning-service'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetCleaningServiceDetail, apiGetCleaningServiceList } from './api'

// Get Cleaning Service List
export const useGetCleaningServiceList = (params: IBuildingManagementCleaningServiceListParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/cleaningService/list', params],
    queryFn: async () => {
      return apiGetCleaningServiceList(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}

// Get Cleaning Service Detail
export const useGetCleaningServiceDetail = (params: IBuildingManagementCleaningServiceDetailParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/cleaningService/detail', params],
    queryFn: async () => {
      return apiGetCleaningServiceDetail(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}
