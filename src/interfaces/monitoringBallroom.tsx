import { IPaginationParams, ISearchParams } from './api'

export interface IMonitoringBallroomList {
  idBooking: number
  idRoom: number
  nama: string
  lokasi: string
  titleRoom: string
  lantaiRuangan: string
  jumlahOrang: string
  totalAsset: string
  kapasitas: string
  tanggalPengajuan: string
  tanggalBooking: string
  waktuBooking: string
  status: string
}

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
