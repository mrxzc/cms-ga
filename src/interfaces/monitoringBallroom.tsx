import { IPaginationParams, ISearchParams } from './api'

export interface IMonitoringBallroomList {}

export interface IMonitoringBallroomDetail {
  tanggalPengajuan: string
  name: string
  lokasi: string
  tanggalBooking: string
  jamBooking: string
  fasilitas: string[]
  requestkapasitas: string
  keperluan: string
  deskripsiBooking: string
  layout: string
  status: string
  lokasiRuangan: string
  titleRoom: string
  lantaiRuangan: string
  deskripsi: string
  termsAndCondition: string
}

export interface IGetListBallroomParams extends IPaginationParams, ISearchParams {
  startDate: string
  endDate: string
}

export interface IGetDetailBallroomParams {
  noIdBooking: string
}
