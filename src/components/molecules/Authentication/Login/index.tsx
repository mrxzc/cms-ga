'use client'

import * as Yup from 'yup'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { LoginCredentials } from '@interfaces/auth'
import { Button } from '@components/atoms/button'
import { apiPostLogin } from '@services/authentication/api'
import { encryptAES } from '@utils/helper/CryptoJS'
import { SetStorage } from '@store/storage'
import TextForm from '@components/atoms/Form/TextForm'
import satellite from '@services/satellite'
import { emailPatterns } from '@utils/regex'
import Image from 'next/image'
import images from '@assets/images'

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email wajib diisi')
    .matches(emailPatterns, 'Masukkan alamat email Anda menggunakan format: bikomaryono@acc.co.id'),
  password: Yup.string().required('Kata sandi wajib diisi'),
})

export default function LoginPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, setError } = useForm<LoginCredentials>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  useEffect(() => {
    delete satellite.defaults?.headers?.common?.Authorization
  }, [])

  const onSubmit = async (value: LoginCredentials) => {
    setIsLoading(true)

    const dataLogin = {
      email: value.email,
      password: encryptAES(value.password),
    }

    apiPostLogin(dataLogin)
      .then((response: any) => {
        if (response.status === 'T') {
          SetStorage('email', value.email)
          SetStorage('noHP', response.data.noHp)
          router.push('/login/otp')
        }
      })
      .catch(error => {
        // You can handle specific errors here if needed
        if (error.response && error.response.data.message === 'Invalid password') {
          // toast.error('Invalid password.')
          setError('password', { type: 'custom', message: 'Kata sandi yang dimasukkan salah' })
        } else if (error.response && error.response.data.message === 'Email not registered') {
          toast.error('Email not registered.')
        } else {
          toast.error('Terjadi kesalahan saat login. Silahkan coba lagi.')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-screen relative">
        <Image src={images.LOGIN_IMAGE} fill alt="Login Image" objectFit="cover" />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <div className="w-full max-w-[412px] flex flex-col items-center">
          <div className="self-start">
            <h1 className="text-[24px] font-bold text-black mt-[12px]">Login</h1>
            <p className=" text-[black] text-heading xs regular-16">Masukkan email dan kata sandi untuk masuk</p>
          </div>
          <form className="rounded-2xl w-full pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-11">
              <p className="text-[black] text-sm">
                Email<span className="text-[red]">*</span>
              </p>
              <TextForm
                fieldInput={{
                  placeholder: 'Email',
                }}
                name="email"
                control={control}
                className="w-full h-[44px] self-center"
              />
            </div>
            <div className="mb-6 ">
              <p className="text-[black] text-sm">
                Kata Sandi<span className="text-[red]">*</span>
              </p>
              <TextForm
                fieldInput={{
                  placeholder: 'Kata Sandi',
                  type: 'password',
                }}
                name="password"
                control={control}
                className="w-full h-[44px] self-center"
              />
            </div>
            <div className="flex items-center justify-center">
              <Button
                className="next-button flex rounded-md justify-center items-center border-white focus:outline-none focus:shadow-outline w-full h-[48px] "
                loader={isLoading}
              >
                Login
              </Button>
            </div>

            <div className="flex items-center justify-center mb-[80px] mt-4">
              <Link href="/forgot-password" className=" text-blue-500 hover:underline font-semibold text-[14px]">
                Lupa Kata Sandi?
              </Link>
            </div>
          </form>
        </div>
        <div className="mt-4 text-center hidden">
          <span className="text-sm font-normal">Belum memiliki akun?</span>
          <Link href="/register" className="text-blue-500 hover:underline font-semibold text-sm">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  )
}
