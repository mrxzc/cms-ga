import {
  IBuildingManagementWasteManagementDetailParams,
  IBuildingManagementWasteManagementListParams,
} from '@interfaces/building-management-waste-management'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetBuildingManagementWasteManagementDetail, apiGetBuildingManagementWasteManagementList } from './api'

// Get Waste Management List
export const useGetBuildingManagementWasteManagementList = (params: IBuildingManagementWasteManagementListParams) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/wasteManagement/list', params],
    queryFn: async () => {
      return apiGetBuildingManagementWasteManagementList(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}

// Get Waste Management Detail
export const useGetBuildingManagementWasteManagementDetail = (
  params: IBuildingManagementWasteManagementDetailParams
) => {
  return useQuery({
    queryKey: ['/cms/master/buildingManagement/wasteManagement/detail', params],
    queryFn: async () => {
      return apiGetBuildingManagementWasteManagementDetail(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}
