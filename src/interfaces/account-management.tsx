export interface IRoleManagementData {
  noId: number
  roleName: string
  description: string | null
  createdAt: string
  flagActive: boolean
}

export interface IUserManagementData {
  idUser: string
  nameUser: string
  npk: string | null // Allow npk to be null
  email: string
  noHp: string
  roleName: string | null // Allow roleName to be null
  flagActive: boolean
}
