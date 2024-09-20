import { IPaginationParams, ISearchParams } from './api'

export interface IMonitoringManpowerList {}

export interface IMonitoringManpowerDetail {
  tanggalPengajuan: string
  kategoriManpower: string
  nama: string
  gender: string
  lokasi: string
  tanggalBooking: string
  jamBooking: string
  keperluan: string
  kebutuhanManpower: string
  status: string
}

export interface IGetListManpowerParams extends IPaginationParams, ISearchParams {
  kategori: string
  startDate: string
  endDate: string
}

export interface IGetDetailManpowerParams {
  noIdBooking: string
}
