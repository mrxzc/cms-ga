import { IPaginationParams, ISearchParams } from './api'

export interface IMonitoringPodsList {
  idBooking: number
  nama: string
  lokasi: string
  titleRoom: string
  lantaiRuangan: string
  kapasitasRuangan: string
  tanggalPengajuan: string
  tanggalBooking: string
  waktuBooking: string
  status: string
}

export interface IMonitoringPodsDetail {
  tanggalPengajuan: string
  name: string
  lokasi: string
  tanggalBooking: string
  jamBooking: string
  requestKapasitas: string
  keperluan: string
  status: string
  lokasiRuangan: string
  titleRoom: string
  lantaiRuangan: string
  kapasitas: string
  deskripsi: string
  termsAndCondition: string
  fasilitas: string[]
}

export interface IGetListPodsParams extends IPaginationParams, ISearchParams {
  lokasi: string
  startDate: string
  endDate: string
}

export interface IGetDetailPodsParams {
  noIdBooking: string
}
