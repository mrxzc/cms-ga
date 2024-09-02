'use client'

import IconLogout from '@assets/icons/iconLogout'
import React, { useState } from 'react'
import { Profile } from '../profile'
import { Modal } from '../ModalCustom'
import { SetCookie } from '@store/storage'
import { useRouter } from 'next/navigation'
import IconModalLogout from '@assets/icons/IconModalLogout'

export default function LogoutButton() {
  const router = useRouter()
  const [isConfimationModalOpen, setIsConfimationModalOpen] = useState<boolean>(false)

  return (
    <div>
      <div className="fixed bottom-0 flex flex-row justify-center items-center ">
        <Profile />
        <div className="cursor-pointer my-6 mx-3 bg-[#235696] text-white px-4 py-2 rounded-lg ">
          <button onClick={() => setIsConfimationModalOpen(!isConfimationModalOpen)}>
            <IconLogout className="mr-2" />
          </button>
        </div>
      </div>

      {/* Modal Logout */}
      <Modal isOpen={isConfimationModalOpen} backdropClick={() => setIsConfimationModalOpen(!isConfimationModalOpen)}>
        <div className=" bg-white relative p-6 text-center rounded-xl items-center">
          <div>
            <IconModalLogout className="mx-auto mb-4 w-28 h-28" />
          </div>
          <div className="text-heading s semibold-18 text-[#252525] mb-1">Yakin ingin logout?</div>
          <div className="text-paragraph regular-14 text-[#717171] px-3">Anda akan keluar dari akun ini.</div>
          <div className="text-paragraph regular-14 text-[#717171] mb-8 px-3">Apakah Anda yakin ingin melanjutkan?</div>

          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <button
              onClick={() => {
                setIsConfimationModalOpen(false)
                SetCookie('data_user', '')
                SetCookie('access_token', '')
                SetCookie('tokenExpiration', '')
                router.push(`/login`, { scroll: false })
              }}
              type="button"
              className="exit-button w-full text-center text-[#00376A] rounded-md  h-11"
            >
              <div className="py-2.5 px-6 text-heading xs semibold-16 text-red">Log Out</div>
            </button>
            <button
              onClick={() => {
                setIsConfimationModalOpen(false)
              }}
              type="button"
              className="cancel-button w-full text-center text-white rounded-xl  h-11"
            >
              <div className="py-2.5 px-6 text-heading xs semibold-16">Kembali</div>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
