// Queries

import { useQuery } from '@tanstack/react-query'
import { apiGetDetailAsset, apiGetListAsset } from './api'
import { IAssetDetailParams, IAssetListParams } from '@interfaces/assets'

// Mendapatkan detail ruangan
export const useGetAssetDetail = (params: IAssetDetailParams) => {
  return useQuery({
    queryKey: ['cms/master/asset/detail', params],
    queryFn: async () => apiGetDetailAsset(params),
    enabled: true,
    staleTime: 5000,
  })
}

// Mendapatkan daftar ruangan
export const useGetAssetList = (params: IAssetListParams) => {
  return useQuery({
    queryKey: ['cms/master/asset/list', params],
    queryFn: async () => apiGetListAsset(params),
    enabled: true,
    refetchOnWindowFocus: false,
  })
}
