export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  fullName: string
  email: string
  dateOfBirth: Date
  phoneNumber: string
  password: string
  confPassword: string
}

export interface ForgotPasswordCredentials {
  phoneNumber: string
}

export interface ResetPasswordCredentials {
  password: string
  confPassword: string
}

export interface OTPCredential {
  email: string
  otpCode: string
}

export interface ILoginResponse {
  noHp: string
}

export interface IOTPLoginResponse {
  idUser: string
  nameUser: string
  groupUser: string
  cdSp: string
  email: string
  noHp: string
  npk: string
  dateOfBirth: string
  tokenSession: string
}

export interface IForgotPassword {
  email: string
  newPasseord: string
}

export interface IProfile {
  npk: string | null
  nameUser: string
  email: string
  dateOfBirth: string
  noHp: string
}
