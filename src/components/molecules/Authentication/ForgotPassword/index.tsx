'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

import TextForm from '@components/atoms/Form/TextForm'
import images from '@assets/images'
import { Button } from '@components/atoms/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { ForgotPasswordCredentials } from '@interfaces/auth'
import { apiPostSendOTPForgot } from '@services/authentication/api'
import { SetStorage } from '@store/storage'
import { emailPatterns } from '@utils/regex'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email wajib diisi')
    .matches(emailPatterns, 'Masukkan alamat email Anda menggunakan format: bikomaryono@acc.co.id'),
})

export default function ForgotPasswordPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, watch } = useForm<ForgotPasswordCredentials>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)

    try {
      // Format nomor telepon
      const dataSendOTP = {
        email: data.email,
      }

      // Kirim permintaan OTP
      const response = await apiPostSendOTPForgot(dataSendOTP)

      if (response.status === 'T') {
        router.push('/forgot-password/otp')
        SetStorage('userEmail', data.email)
      } else {
        alert('Terjadi kesalahan saat mengirim OTP. Silakan coba lagi.')
      }
    } catch (error) {
      setIsLoading(false)
      alert('Terjadi kesalahan. Silakan coba lagi nanti.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-screen relative">
        <Image src={images.LOGIN_IMAGE} fill alt="Login Image" objectFit="cover" />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <div className="w-full max-w-[420px]">
          <h1 className="text-[28px] font-bold text-black mt-[12px]">Atur Ulang Kata Sandi</h1>
          <p className="text-sm font-normal text-[#6B7280]">
            Masukkan e-mail yang terdaftar. Kami akan mengirimkan kode verifikasi untuk atur ulang kata sandi.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className=" mt-[10px] text-sm">
              Email<span className="text-red-500">*</span>
            </p>
            <TextForm
              fieldInput={{
                placeholder: 'Email',
              }}
              name="email"
              control={control}
              className="w-full h-[44px] self-center mb-11"
            />
            <Button
              className="flex bg-buttonLogin hover:bg-blue-700 shadowtext-white font-bold border-2 border-white focus:outline-none focus:shadow-outline rounded-lg items-center justify-center w-full h-[48px]"
              type="submit"
              loader={isLoading}
              disabled={!watch('email')}
            >
              Lanjut
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
