export interface IPaginations {
  totalRecords: number
  currentPage: number
  totalPage: number
  nextPage: number | null
  prevPage: number | null
}

export interface IPaginationParams {
  page?: number // nomor page yang mau ditampilkan (Contoh: 1)
  size?: number // banyak data yang mau ditampikan dalam satu page (Contoh: 10)
}

export interface ISearchParams {
  search?: string // keyword yang akan diisi  (Contoh: Toyota, Bangku)
}

export interface APIBaseResponse<T = undefined> {
  reqId: string
  status: boolean | number | string
  message: string
  error: string | null
  data?: T extends undefined ? never : T
  pagination?: IPaginations | undefined
}
