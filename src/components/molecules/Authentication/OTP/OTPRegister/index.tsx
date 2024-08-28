'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@components/atoms/button'
import { IconLeftArrow } from '@components/atoms/Icon'
import { useCountDownTimer } from '@utils/hooks/useCountDownTimer'
import Modals from '@components/atoms/modal/Modals'
import OTPInput from '@components/atoms/OTPInput'
import { apiPostOTPRegister } from '@services/authentication/api'
import { toast } from 'react-toastify'
import { GetStorage } from '@store/storage'

export default function OTPRegister() {
  const router = useRouter()
  const [dataRegister, setDataRegister] = useState<any>()

  const [timeOutOTP, setTimeOutOTP] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [inputOTP, setInputOTP] = useState('')
  const [clearOtp, setClearOtp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleComplete = (otp: any) => {
    setInputOTP(otp)
  }

  const { countDownTime, startCountDownTime, setCountDownTimeInMilliseconds } = useCountDownTimer({
    countDownTimeInMilliseconds: 2 * 60 * 1000, // 2 menit
    onEndOfTime: () => {
      setTimeOutOTP(true)
      setIsModalOpen2(true)
    },
  })

  useEffect(() => {
    startCountDownTime()

    const data = GetStorage('data_register')
    if (!data) {
      router.push('/login')
    } else {
      setDataRegister(data)
    }
  }, [])

  // Handle tombol back ke dashboard
  const handleBack = useCallback(() => {
    router.back()
  }, [])

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const dataOTP = {
        email: dataRegister?.email,
        otpCode: inputOTP,
      }

      const response = await apiPostOTPRegister(dataOTP)

      if (response.status === 'T') {
        toast.success('Berhasil meregister akun baru. Silakan verifikasi nomor terlebih dahulu.')
        setTimeout(() => {
          setIsLoading(false)
          router.push('/login')
        }, 3000)
      } else {
        toast.error('Terjadi kesalahan saat mendaftar. Silakan coba lagi.')
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.request) {
        toast.error('Gagal terhubung ke server. Periksa koneksi internet Anda.')
      } else {
        toast.error('Terjadi kesalahan saat mengirim permintaan. Silakan coba lagi.')
      }
    } finally {
      sessionStorage.removeItem('data_register')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-full max-w-xs">
        <button onClick={handleBack}>
          <IconLeftArrow height={24} width={24} className="cursor-pointer" />
        </button>
        <h1 className="text-[28px] font-bold text-black mt-[12px]">Masukkan Kode OTP</h1>
        <p className="text-sm font-normal text-[#6B7280] mb-5">
          Kode verifikasi telah dikirimkan ke <span className="text-[#0089cf]">08******123</span>
        </p>
        <div className="flex flex-col items-center justify-center mb-5">
          <div className="mb-5">
            <OTPInput
              length={6}
              onComplete={handleComplete}
              isError={false}
              onhandleChange={() => {}}
              isDisable={false}
              isClearOTP={clearOtp}
            />
          </div>

          {timeOutOTP ? (
            <p className="text-sm font-normal text-[#6B7280] self-center">
              Tidak dapat kode?{' '}
              <button
                className="text-semibold cursor-pointer text-[#0089cf]"
                onClick={() => {
                  setCountDownTimeInMilliseconds(2 * 60 * 1000)
                  startCountDownTime()
                  setTimeOutOTP(false)
                  setInputOTP('')
                  setClearOtp(!clearOtp)
                }}
              >
                Kirim ulang
              </button>
            </p>
          ) : (
            <p className="text-sm font-normal text-[#6B7280] self-center">
              OTP Kadaluarsa dalam{' '}
              <span className="font-semibold cursor-pointer text-[#0089cf]">
                {countDownTime.minutes}:{countDownTime.seconds}
              </span>
            </p>
          )}
        </div>
        <Button
          className="flex bg-[#386293] hover:bg-blue-700 mt-[20px] shadowtext-white font-bold border-2 border-white focus:outline-none focus:shadow-outline rounded-lg items-center justify-center w-full h-[48px]"
          disabled={inputOTP.length <= 0}
          loader={isLoading}
          onClick={onSubmit}
        >
          Verifikasi OTP
        </Button>
      </div>

      {/* Modals */}
      <Modals
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Gagal Memverifikasi OTP"
        content="Silahkan masukkan kode OTP yang tepat"
        icon={{
          name: 'Failed',
          width: 107,
          height: 108,
        }}
        action={{
          label: 'Kembali',
          onClick: () => setIsModalOpen(false),
          className:
            'flex bg-[#2C598D] hover:bg-blue-700 mt-[20px] shadowtext-white font-bold border-2 border-white focus:outline-none focus:shadow-outline rounded-lg items-center justify-center w-full h-[48px]',
        }}
      />
      <Modals
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        title="Verifikasi Expired"
        content="Masukkan kode OTP yang baru"
        icon={{
          name: 'Failed',
          width: 107,
          height: 108,
        }}
        action={{
          label: 'Kembali',
          onClick: () => setIsModalOpen2(false),
          className:
            'flex bg-[#2C598D] hover:bg-blue-700 mt-[20px] shadowtext-white font-bold border-2 border-white focus:outline-none focus:shadow-outline rounded-lg items-center justify-center w-full h-[48px]',
        }}
      />
    </div>
  )
}
