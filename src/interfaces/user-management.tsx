export interface IUserData {
  idUser: string
  nameUser: string
  npk: string | null // Mengizinkan npk null
  email: string
  roleName: string | null // Mengizinkan roleName null
  flagActive: boolean
}

export interface IUserCreatePayload {
  email: string
  nameUser: string
  npk: string // NPK is a string based on the example
  birthOfDate: string // Date format is assumed to be YYYY-MM-DD
  noHp: string
  roleId: number
}

export interface IUserCreateResponse {
  idUser: string
  nameUser: string
  npk: string
  email: string
  birthOfDate: string // Assuming YYYY-MM-DD format
  noHp: string
  role: {
    noId: number
    roleName: string
  }
  flagActive: boolean
}

export interface IVerificationUserData {
  idUser: string
  nameUser: string
  npk: string | null // Mengizinkan npk null
  email: string
  noHp: string
  roleName: string | null // Mengizinkan roleName null
  flagVerify: boolean | null // Mengizinkan flagVerify null
  verifyStatus: string
}
