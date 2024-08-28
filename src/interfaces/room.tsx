import { IPaginationParams } from './api'

export interface IRoomListParams {
  search: string
  page: number
  size: number
  sortField: string
  sortDirection: 'ASC' | 'DESC'
  kategoriMenu: string
}

export interface IRoomDetailParams {
  roomId: string
}

export interface IRoomList extends IPaginationParams {
  pathImage: string[]
  titleRoom: string
  lokasi: string
  lantaiRuangan: string
  kapasitas: string
  status: 'Active' | 'Non-Active'
}

export interface IRoomDetail extends IPaginationParams {
  flagActive: string
  location: string
  titleRoom: string
  lantaiRuangan: string
  kapasitas: number
  deskripsi: string
  termsCondition: string
  kategoriMenu: string
  fasilitas: string[]
  fileImages: string[]
}

export interface ICreateRoomPayload {
  titleRoom: string
  fileImages: File | any
  lantaiRuangan: string
  flagActive: string
  location: string
  kapasitas: number
  deskripsi: string
  termsCondition: string
  fasilitas: string
  kategoriMenu: string
}

export interface IUpdateRoomPayload {
  roomId: number
  titleRoom: string
  fileImages: File | any
  lantaiRuangan: string
  flagActive: string
  location: string
  kapasitas: number
  deskripsi: string
  termsCondition: string
  fasilitas: string[]
  kategoriMenu: string
}
