import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import {
  apiPostForgotPassword,
  apiPostLogin,
  apiPostOTPLogin,
  apiPostOTPRegister,
  apiPostRegister,
  apiPostSendOTPForgot,
  apiPostVerifyOTPForgot,
} from './api'
import { LoginCredentials, OTPCredential } from '@interfaces/auth'

// Kelompokkan semua useMutation dalam satu objek
export const authMutations = {
  // Login
  useLogin: () => {
    const router = useRouter()
    return useMutation({
      mutationFn: (data: LoginCredentials) => apiPostLogin(data), // Wrap in mutationFn
      onSuccess: () => {
        toast.success('Login berhasil!')
        router.push('/')
      },
      onError: () => {
        toast.error('Login gagal. Periksa kembali username dan password Anda.')
      },
    })
  },

  // Verifikasi OTP Login
  useOTPLogin: () => {
    const router = useRouter()
    return useMutation({
      mutationFn: (data: OTPCredential) => apiPostOTPLogin(data), // Wrap in mutationFn
      onSuccess: () => {
        toast.success('Verifikasi OTP berhasil!')
        router.push('/dashboard')
      },
      onError: () => {
        toast.error('Verifikasi OTP gagal. Periksa kembali kode OTP Anda.')
      },
    })
  },

  // Registrasi
  useRegister: () => {
    return useMutation({
      mutationFn: (data: any) => apiPostRegister(data), // Wrap in mutationFn
      onSuccess: () => {
        toast.success('Registrasi berhasil!')
        // ... mungkin arahkan ke halaman login atau verifikasi OTP
      },
      onError: () => {
        toast.error('Registrasi gagal. Silakan coba lagi.')
      },
    })
  },

  // Verifikasi OTP Registrasi
  useOTPRegister: () => {
    const router = useRouter()
    return useMutation({
      mutationFn: (data: OTPCredential) => apiPostOTPRegister(data), // Wrap in mutationFn
      onSuccess: () => {
        toast.success('Verifikasi OTP registrasi berhasil!')
        router.push('/login')
      },
      onError: () => {
        toast.error('Verifikasi OTP registrasi gagal. Periksa kembali kode OTP Anda.')
      },
    })
  },

  // Lupa password (ganti password)
  useForgotPassword: () => {
    const router = useRouter()
    return useMutation({
      mutationFn: (data: any) => apiPostForgotPassword(data), // Wrap in mutationFn
      onSuccess: () => {
        toast.success('Password berhasil diubah!')
        router.push('/login')
      },
      onError: () => {
        toast.error('Gagal mengubah password. Silakan coba lagi.')
      },
    })
  },

  // Mengirim OTP untuk lupa password
  useSendOTPForgot: () => {
    return useMutation({
      mutationFn: (data: any) => apiPostSendOTPForgot(data), // Wrap in mutationFn
      onSuccess: () => {
        toast.success('OTP berhasil dikirim. Silakan cek email Anda.')
        // ... mungkin arahkan ke halaman verifikasi OTP
      },
      onError: () => {
        toast.error('Gagal mengirim OTP. Silakan coba lagi.')
      },
    })
  },

  // Verifikasi OTP untuk lupa password
  useVerifyOTPForgot: () => {
    return useMutation({
      mutationFn: (data: any) => apiPostVerifyOTPForgot(data), // Wrap in mutationFn
      onSuccess: () => {
        toast.success('Verifikasi OTP berhasil!')
        // ... mungkin arahkan ke halaman ganti password
      },
      onError: () => {
        toast.error('Verifikasi OTP gagal. Periksa kembali kode OTP Anda.')
      },
    })
  },
}
