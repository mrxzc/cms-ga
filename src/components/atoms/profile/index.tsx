'use client'

import IconProfile, { IconProfileLG } from '@assets/icons/IconProfile'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Profile() {
  const pathname = usePathname()
  return (
    <Link href={'/profile'}>
      <div
        className={`${
          pathname === '/profile' ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'
        } text-base font-semibold my-1 py-2 px-3 hover:bg-menuColor hover:rounded-lg hover:text-teksActive flex flex-row items-center`}
      >
        <IconProfile className="mr-2" />
        <h1 className="font-semibold text-teksBlack text-base">Biko Maryono</h1>
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
