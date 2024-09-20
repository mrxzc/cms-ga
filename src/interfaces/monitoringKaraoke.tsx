import { IPaginationParams, ISearchParams } from './api'

export interface IMonitoringKaraokeList {
  idBooking: number
  idRoom: number
  nama: string
  lokasi: string
  lantaiRuangan: string
  tanggalPengajuan: string
  tanggalBooking: string
  waktuBooking: string
  status: string
}

export interface IMonitoringKaraokeDetail {
  tanggalPengajuan: string
  name: string
  lokasi: string
  tanggalBooking: string
  jamBooking: string
  keperluan: string
  status: string
}

export interface IGetListKaraokeParams extends IPaginationParams, ISearchParams {
  startDate: string
  endDate: string
}

export interface IGetDetailKaraokeParams {
  noIdBooking: string
}
