import { IPaginationParams } from './api'

export interface IListContent {
  idFile: number
  fileName: string
  subKategoriMenu: string
  pathFile: string
}

export interface IListContentParams extends IPaginationParams {
  kategoriMenu: string
}

export interface IDeleteContentParams {
  fileId: string
}
