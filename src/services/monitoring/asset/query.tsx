import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailAsset, apiGetListAsset } from './api'
import { IGetListAssetParams, IGetDetailAssetParams } from '@interfaces/monitoringAsset'
import { ISearchParams } from '@interfaces/api'
import { AssetStatusClassEnum } from '@interfaces/assetEnum'

// Get List Asset
export const useGetListAsset = (params: IGetListAssetParams) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/asset/list', params],
    queryFn: async () =>
      apiGetListAsset(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
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

// Get List Asset Status
export const useGetListAssetStatus = (params: ISearchParams) => {
  const assetStatus = new AssetStatusClassEnum()

  return useQuery({
    queryKey: ['/list/asset/status', params],
    queryFn: async () => {
      return new Promise(function (resolve) {
        setTimeout(() => {
          // reject(new Error('failed fetch'))
          resolve(params?.search ? assetStatus.search(params?.search) : assetStatus.enums)
        }, 1000)
      })
    },
  })
}
