import { IGetDetailAssetParams, IGetListAssetParams } from '@interfaces/monitoringAsset'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailAsset, apiGetListAsset } from './api'
import { AssetMonitoringStatusClassEnum } from './enums'
import { ISearchParams } from '@interfaces/api'

// Get List Asset
export const useGetListAsset = (params: IGetListAssetParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/asset/list', params],
    queryFn: async () => {
      return apiGetListAsset(params).catch((error: Error) => {
        toast.error(error?.message)
        return null
      })
    },
  })
}

// Get Detail Asset
export const useGetDetailAsset = (params: IGetDetailAssetParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/asset/detail', params],
    queryFn: async () =>
      apiGetDetailAsset(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get List Asset Monitoring Status
export const useGetListAssetMonitoringStatus = (params: ISearchParams) => {
  const monitoringStatus = new AssetMonitoringStatusClassEnum()

  return useQuery({
    queryKey: ['/cms/master/monitoring/asset/status', params],
    queryFn: async () => {
      return new Promise(function (resolve) {
        setTimeout(() => {
          // reject(new Error('failed fetch'))
          resolve(params?.search ? monitoringStatus.search(params?.search) : monitoringStatus.enums)
        }, 100)
      })
    },
  })
}
