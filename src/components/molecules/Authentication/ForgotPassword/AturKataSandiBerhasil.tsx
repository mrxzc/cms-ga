'use client'

import { Button } from '@components/atoms/button'
import { useRouter } from 'next/navigation'
import { IconSuccess } from '@components/atoms/Icon'
import { useEffect } from 'react'

export default function AturKataSandiBerhasil() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-xs ">
        <IconSuccess height={178} width={178} className="cursor-pointer mx-auto" />
        <h1 className="text-[28px] font-bold text-black mt-[12px] text-center">Atur Ulang Kata Sandi Berhasil</h1>
        <p className="mb-8 text-center text-sm text-[#6B7280] font-normal">Anda sekarang dapat masuk ke akun Anda</p>
        <Button
          className="flex bg-[#386394] hover:bg-blue-700 mt-[20px] shadowtext-white font-bold border-2 border-white focus:outline-none focus:shadow-outline rounded-lg items-center justify-center w-full h-[48px]"
          onClick={() => router.push('/login')}
        >
          Masuk
        </Button>
      </div>
    </div>
  )
}
