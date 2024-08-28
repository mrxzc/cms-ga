'use client'

import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { IconLeftArrow } from '@components/atoms/Icon'
import { passwordPattern } from '@utils/regex'
import { RegisterCredentials } from '@interfaces/auth'
import { Button } from '@components/atoms/button'
import TextForm from '@components/atoms/Form/TextForm'
import DatePickerForm from '@components/atoms/Form/DatePickerForm'
import { apiPostRegister } from '@services/authentication/api'
import { toast } from 'react-toastify'
import { encryptAES } from '@utils/helper/CryptoJS'
import { SetStorage } from '@store/storage'

const schema = yup.object().shape({
  fullName: yup.string().required('Nama Lengkap diperlukan'),
  email: yup
    .string()
    .email('Masukkan alamat email Anda menggunakan format: bikomaryono@acc.co.id')
    .required('Email diperlukan'),
  dateOfBirth: yup.date().required('Tanggal Lahir diperlukan'),
  phoneNumber: yup.string().required('Nomor Telepon diperlukan').min(9, 'No Handphone minimal 9 digit'),
  password: yup
    .string()
    .required('Kata Sandi diperlukan')
    .min(8, 'Kata Sandi minimal 8 digit')
    .matches(passwordPattern, 'Password harus berupa Huruf Besar, Huruf Kecil, Angka dan Simbol.'),
  confPassword: yup
    .string()
    .required('Konfirmasi Kata Sandi diperlukan')
    .min(8, 'Konfirmasi Kata Sandi minimal 8 digit')
    .matches(passwordPattern, 'Kata Sandi harus berupa Huruf Besar, Huruf Kecil, Angka dan Simbol.')
    .oneOf([yup.ref('password')], 'Kata Sandi tidak sama'),
})

export default function RegisterPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, setValue } = useForm<RegisterCredentials>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  function convertToDesiredFormat(dateString: any) {
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
  }

  const isDisabled = () => {
    if (isLoading) {
      return true
    } else {
      return false
    }
  }

  const handlePhoneNumberChange = (e: any) => {
    const value = e.target.value
    const formattedValue = value.replace(/^0+/, '')
    setValue('phoneNumber', formattedValue)
  }

  // Handle tombol back ke dashboard
  const handleBack = useCallback(() => {
    router.back()
  }, [])

  const onSubmit = (value: RegisterCredentials) => {
    setIsLoading(true)
    const convertDate = convertToDesiredFormat(value.dateOfBirth)

    const registerData = {
      nameUser: value.fullName,
      email: value.email,
      birthOfDate: convertDate,
      noHp: `0${value.phoneNumber.replace(/^0+/, '')}`,
      password: encryptAES(value.password),
    }

    if (value.password === value.confPassword) {
      apiPostRegister(registerData)
        .then(response => {
          if (response.status === 'T') {
            toast.success('Berhasil meregister akun baru. Silakan verifikasi nomor terlebih dahulu.')
            setTimeout(() => {
              setIsLoading(false)
              SetStorage('data_register', registerData)
              router.push('/register/otp')
            }, 3000)
          } else {
            toast.error('Terjadi kesalahan saat mendaftar. Silakan coba lagi.')
          }
        })
        .catch(error => {
          if (error?.response?.data?.message) {
            toast.error(error.response.data.message)
          } else if (error.request) {
            toast.error('Gagal terhubung ke server. Periksa koneksi internet Anda.')
          } else {
            toast.error('Terjadi kesalahan saat mengirim permintaan. Silakan coba lagi.')
          }
          setIsLoading(false)
        })
    } else {
      toast.error('Password dan konfirmasi password tidak sama.')
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center mt-5">
        <div className="w-full max-w-xs">
          <button onClick={handleBack}>
            <IconLeftArrow height={24} width={24} className="cursor-pointer" />
          </button>
          <h1 className="text-[28px] font-bold text-black mt-[12px]">Daftar Sekarang</h1>
          <div>
            <span className="text-sm">Sudah memiliki akun BARN? </span>
            <Link href="/login" className="text-blue-500 hover:underline text-[14px] font-semibold">
              Masuk
            </Link>
          </div>
        </div>
        <div className="w-full max-w-xs mt-5">
          <p className="text-sm text-[#7d8389] mt-[10px]">Nama Lengkap</p>
          <TextForm
            fieldInput={{
              placeholder: 'Nama Lengkap',
            }}
            name="fullName"
            control={control}
          />
          <p className="text-sm text-[#7d8389] mt-[10px]">No. Telepon</p>
          <TextForm
            fieldInput={{
              type: 'tel',
              placeholder: 'Masukkan Nomor Telepon',
            }}
            control={control}
            name="phoneNumber"
            prefix="+62"
            onChange={e => handlePhoneNumberChange(e)}
          />
          <p className="text-sm text-[#7d8389] mt-[10px]">Email</p>
          <TextForm
            fieldInput={{
              placeholder: 'Email',
            }}
            name="email"
            control={control}
          />
          <p className="text-sm text-[#7d8389] mt-[10px]">Tanggal Lahir</p>
          <DatePickerForm control={control} name="dateOfBirth" placeholder="Choose a date" className="my-4" />
          <p className="text-sm text-[#7d8389] mt-[10px]">Kata Sandi</p>
          <TextForm
            fieldInput={{
              placeholder: 'Password',
              type: 'password',
            }}
            name="password"
            control={control}
          />
          <p className="text-sm text-[#7d8389] mt-[10px]">Ketik Ulang Kata Sandi</p>
          <TextForm
            fieldInput={{
              placeholder: 'Password',
              type: 'password',
            }}
            name="confPassword"
            control={control}
          />

          <Button
            loader={isLoading}
            className="flex bg-[#346194] hover:bg-blue-700 mt-[20px] text-white font-bold border-2 border-white focus:outline-none focus:shadow-outline rounded-lg items-center justify-center w-full h-[48px]"
            disabled={isDisabled()}
            type="submit"
          >
            Daftar
          </Button>
        </div>
      </div>
    </form>
  )
}
