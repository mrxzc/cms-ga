import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailBuildingMaintenance, apiGetListBuildingMaintenance } from './api'
import {
  IGetListBuildingMaintenanceParams,
  IGetDetailBuildingMaintenanceParams,
} from '@interfaces/monitoringBuildingMaintenance'

// Get List Building Maintenance
export const useGetListBuildingMaintenance = (params: IGetListBuildingMaintenanceParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/buildingMaintenance/list', params],
    queryFn: async () =>
      apiGetListBuildingMaintenance(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Detail Building Maintenance
export const useGetDetailBuildingMaintenance = (params: IGetDetailBuildingMaintenanceParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/buildingMaintenance/detail', params],
    queryFn: async () =>
      apiGetDetailBuildingMaintenance(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}
