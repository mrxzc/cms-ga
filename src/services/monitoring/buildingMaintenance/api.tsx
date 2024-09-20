import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringBuildingMaintenanceList,
  IMonitoringBuildingMaintenanceDetail,
  IGetListBuildingMaintenanceParams,
  IGetDetailBuildingMaintenanceParams,
} from '@interfaces/monitoringBuildingMaintenance'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
import { dummyGetDetailBuildingMaintenance, dummyGetListBuildingMaintenance } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListBuildingMaintenance(
  params: IGetListBuildingMaintenanceParams
): Promise<APIBaseResponse<IMonitoringBuildingMaintenanceList[]>> {
  return dummyGetListBuildingMaintenance()

  return api.get<IMonitoringBuildingMaintenanceList[], APIBaseResponse<IMonitoringBuildingMaintenanceList[]>>(
    '/cms/master/monitoring/buildingMaintenance/list',
    {
      params,
    }
  )
}

export function apiGetDetailBuildingMaintenance(
  params: IGetDetailBuildingMaintenanceParams
): Promise<APIBaseResponse<IMonitoringBuildingMaintenanceDetail>> {
  return dummyGetDetailBuildingMaintenance()

  return api.get<IMonitoringBuildingMaintenanceDetail, APIBaseResponse<IMonitoringBuildingMaintenanceDetail>>(
    '/cms/master/monitoring/buildingMaintenance/detail',
    {
      params,
    }
  )
}
