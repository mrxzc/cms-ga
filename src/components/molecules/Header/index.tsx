'use client'

import IconGrape from '@assets/icons/IconGrape'
import { ProfileMobile } from '@components/atoms/profile'
import useNamePage from '@hooks/useNamePage'

export default function Header() {
  const pageName = useNamePage()
  return (
    <header className="flex flex-row md:py-6 md:px-6 py-2 px-5">
      <h1 className="flex text-teksNatural justify-center items-center">{pageName}</h1>

      <div className="flex-row ml-auto hidden md:flex">
        <IconGrape />
        <h1 className="text-teksNatural">BEFAST</h1>
      </div>

      <div className="md:hidden ml-auto">
        <ProfileMobile />
      </div>
    </header>
  )
}
