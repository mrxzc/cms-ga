import { IPaginationParams } from './api'

export interface IAssetListParams {
  search?: string
  page?: string | number
  size: number
  sortField: string
  sortDirection: 'ASC' | 'DESC'
}

export interface IAssetDetailParams {
  noIdAsset: string
}

export interface IAssetList extends IPaginationParams {
  assetName: string
  lokasi: string
  status: 'Active' | 'Non-Active'
}

export interface IAssetDetail extends IPaginationParams {
  flagActive: string
  assetName: string
  lokasi: string
  stock: number
  pathImage: string
  brands: Ibrand[]
}

export interface Ibrand {
  name: string
  stock: number
  flagActive: string
}

export interface ICreateAssetPayload {
  flagActive: string
  assetName: string
  lokasi: string
  brands: Ibrand[]
}

export interface IUpdateAssetPayload {
  noIdAsset: number
  flagActive: string
  assetName: string
  lokasi: string
  brands: Ibrand[]
}

export interface IDeleteAssetParams {
  assetId: number | string
}
