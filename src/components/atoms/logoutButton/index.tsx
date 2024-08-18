import IconLogout from '@assets/icons/iconLogout'
import React from 'react'
import { Profile } from '../profile'

export default function LogoutButton() {
  return (
    <div className="fixed bottom-0 flex flex-row justify-center items-center">
      <Profile />
      <div className="cursor-pointer my-6 mx-3 bg-[#235696] text-white px-4 py-2 rounded-lg ">
        <IconLogout className="mr-2" />
      </div>
    </div>
  )
}
