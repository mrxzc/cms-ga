import { IPaginationParams, ISearchParams } from './api'

export interface IMonitoringAssetList {
  idBooking: number
  nama: string
  totalAsset: string
  tanggalBooking: string
  waktuBooking: string
  tanggalPengajuan: string
}

export interface IMonitoringAssetDetail {
  tanggalPengajuan: string
  name: string
  lokasi: string
  tanggalBooking: string
  jamBooking: string
  keperluan: string
  status: string
  produkTotal: string
  assets: any
}

export interface IGetListAssetParams extends IPaginationParams, ISearchParams {
  startDate: string
  endDate: string
  status: string
}

export interface IGetDetailAssetParams {
  noIdBooking: string
}
