'use client'

import { Button } from '@components/atoms/button'
import TextForm from '@components/atoms/Form/TextForm'
import { IconLeftArrow } from '@components/atoms/Icon'
import { yupResolver } from '@hookform/resolvers/yup'
import { ResetPasswordCredentials } from '@interfaces/auth'
import { apiPostForgotPassword } from '@services/authentication/api'
import { GetStorage, SetStorage } from '@store/storage'
import { encryptAES } from '@utils/helper/CryptoJS'
import { passwordPattern } from '@utils/regex'
import { useRouter } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Kata Sandi Baru diperlukan')
    .min(8, 'Kata Sandi minimal 8 digit')
    .matches(passwordPattern, 'Password harus berupa Huruf Besar, Huruf Kecil, Angka dan Simbol.'),
  confPassword: yup
    .string()
    .required('Kata Sandi Baru diperlukan')
    .min(8, 'Kata Sandi minimal 8 digit')
    .oneOf([yup.ref('password')], 'Kata Sandi tidak sama'),
})

export default function AturUlangKataSandi() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>('')

  const { handleSubmit, control, watch } = useForm<ResetPasswordCredentials>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  useEffect(() => {
    const email = GetStorage('email')
    setUserEmail(email)
  }, [])

  const onSubmit = async (value: any) => {
    try {
      setIsLoading(true)
      const dataForgot = {
        email: userEmail,
        newPassword: encryptAES(value.password),
      }
      const response = await apiPostForgotPassword(dataForgot)
      if (response.status !== 'T') {
        throw new Error('Forgot password request failed. Please try again later.')
      }
      setIsLoading(false)
      router.push('/forgot-password/success')
    } catch (error) {
      setIsLoading(false)
      alert('There was an error processing your request. Please try again later.')
    } finally {
      // Optional cleanup or actions regardless of success or error (e.g., reset form fields)
      SetStorage('email', '')
    }
  }

  const handleBack = useCallback(() => {
    router.back()
  }, [])

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-full max-w-xs">
        <button onClick={handleBack}>
          <IconLeftArrow height={24} width={24} className="cursor-pointer" />
        </button>
        <h1 className="text-[28px] font-bold text-black mt-[12px]">Atur Ulang Kata Sandi</h1>
        <p className="mb-8 text-[#6B7280] text-[14px] font-normal">
          Buat kata sandi barumu untuk akun dengan email <span className="text-[#6cb8e0]">{userEmail}</span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="text-[#7d8389] text-sm">
              Kata Sandi Baru<span className="text-red">*</span>
            </p>
            <TextForm
              fieldInput={{
                placeholder: 'Kata Sandi Baru',
                type: 'password',
              }}
              name="password"
              control={control}
            />
          </div>
          <div className="mb-6">
            <p className="text-[#7d8389] text-sm">
              Ketik Ulang Kata Sandi Baru <span className="text-red">*</span>
            </p>
            <TextForm
              fieldInput={{
                placeholder: 'Ketik Ulang Kata Sandi Baru',
                type: 'password',
              }}
              name="confPassword"
              control={control}
            />
          </div>
          <Button
            className="flex bg-[#386394] hover:bg-blue-700 mt-[20px] shadowtext-white font-bold border-2 border-white focus:outline-none focus:shadow-outline rounded-lg items-center justify-center w-full h-[48px]"
            disabled={watch('password') !== watch('confPassword')}
            type="submit"
            loader={isLoading}
          >
            Lanjut
          </Button>
        </form>
      </div>
    </div>
  )
}
