import { IGetDetailAssetParams, IGetListAssetParams } from '@interfaces/monitoringAsset'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetDetailAsset, apiGetListAsset } from './api'

// Get List Asset
export const useGetListAsset = (params: IGetListAssetParams, reduceParams: boolean = true) => {
  return useQuery({
    queryKey: ['/cms/master/monitoring/asset/list', params],
    queryFn: async () => {
      if (reduceParams) {
        Object.keys(params).forEach(key => {
          if (!params[key as keyof IGetListAssetParams]) {
            delete params[key as keyof IGetListAssetParams]
          }
        })
      }

      return apiGetListAsset(params).catch((error: Error) => {
        toast.error(error?.message)
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
