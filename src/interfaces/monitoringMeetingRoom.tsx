import { IPaginationParams, ISearchParams } from './api'

export interface IMonitoringMeetingRoomList {
  idBooking: number
  idRoom: number
  nama: string
  lokasi: string
  titleRoom: string
  lantaiRuangan: string
  kapasitas: string
  tanggalPengajuan: string
  tanggalBooking: string
  waktuBooking: string
  status: string
}

export interface IMonitoringMeetingRoomDetail {
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

export interface IGetListMeetingRoomParams extends IPaginationParams, ISearchParams {
  titleRoom: string
  location: string
  lantaiRuangan: string
  status: string
  startDate: string
  endDate: string
}

export interface IGetDetailMeetingRoomParams {
  noIdBooking: string
}
