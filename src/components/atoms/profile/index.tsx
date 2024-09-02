'use client'

import Link from 'next/link'
import { GetCookie } from '@store/storage'
import { usePathname } from 'next/navigation'

import IconProfile, { IconProfileLG } from '@assets/icons/IconProfile'
import { useEffect, useState } from 'react'

export function Profile() {
  const pathname = usePathname()
  const [dataUser, setDataUser] = useState({} as any)

  useEffect(() => {
    const userData = GetCookie('data_user')
    setDataUser(userData)
  }, [])

  return (
    <Link href={'/profile'}>
      <div
        className={`${
          pathname === '/profile' ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'
        } text-base font-semibold my-1 py-2 px-3 hover:bg-menuColor hover:rounded-lg hover:text-teksActive flex flex-row items-center`}
      >
        <IconProfile className="mr-2" />
        <h1 className="font-semibold text-teksBlack text-base">{dataUser?.nameUser}</h1>
      </div>
    </Link>
  )
}

export function ProfileMobile() {
  return (
    <Link href={'/profile'}>
      <div>
        <IconProfileLG color="#235696" />
      </div>
    </Link>
  )
}
