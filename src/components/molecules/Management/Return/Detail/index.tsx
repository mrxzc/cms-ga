'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconAlertDelete from '@assets/icons/IconAlertDelete'
import ProductList from '@components/atoms/ProductList'
import { data } from './data'
import { Modal } from '@components/atoms/ModalCustom'

export function DetailReturn() {
  const [requestData, setRequestData] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  useEffect(() => {
    if (slug) {
      const matchingRequest = data.find(item => item.no.toString() === slug)
      setRequestData(matchingRequest || undefined)
    }
  }, [slug])

  const handleStatus = (status: string) => {
    if (status === 'Done') {
      return (
        <div className="bg-[#eaf5e9] text-[#457b3b] border max-w-[140px] py-2 px-2  border-[#afd5ab] rounded text-paragraph semibold-14">
          Selesai
        </div>
      )
    }
    if (status === 'Waiting') {
      return (
        <div className="bg-[#FDF4E2] text-[#F19D38] border max-w-[155px] py-2 px-2  border-[#F19D38] rounded text-paragraph semibold-14">
          Menunggu Approval
        </div>
      )
    } else {
      return (
        <div className="bg-[#fcebee] text-[#b63831] border max-w-[140px] py-2 px-2  border-[#e39e9c] rounded text-paragraph semibold-14">
          Tidak Berhasil
        </div>
      )
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="mb-[600px]">
        <div className="px-4 py-8 ">
          <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                router.push('/management/product-return')
              }}
            >
              <div className="text-extra-small regular-12 text-[#235696]">Booking Asset Data - Pengembalian Barang</div>
            </button>
            <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
            <div className="text-extra-small regular-12 text-[#252525]">Pengembalian Barang Detail</div>
          </div>

          <div className="bg-white rounded-lg mb-4 p-6 relative">
            <p className="text-heading s semibold-18 mb-10">Request Asset</p>

            <div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Tanggal Pengajuan</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.submissionDate}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Nama</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.name}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Lokasi</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.location}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Tanggal Booking</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.bookingDate}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Waktu Booking</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.bookingTime}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Keperluan</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.reason}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Status</p>
                <div className="col-span-3">
                  <div>{requestData?.status !== undefined && handleStatus(requestData?.status)}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 items-end">
              <button
                className="bg-[#235696] border border-[#235696] text-[#e5f2fc] rounded-md px-2 py-3 max-w-[160px] max-h-[50px] items-center justify-center flex text-heading xs regular-16"
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                Barang Diterima
              </button>
            </div>
          </div>

          {/* Detail Asset yang dipesan */}
          <div className="bg-white rounded-lg mb-4 p-6 relative">
            <p className="text-heading s semibold-18 mb-10">Detail Asset yang dipesan</p>
            <div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-start">
                <p className="text-heading xs regular-16">
                  Produk total : <span className="text-heading xs semibold-16">{requestData?.detail?.totalItems}</span>{' '}
                  Items
                </p>

                {requestData ? <ProductList data={requestData?.detail} /> : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} backdropDismiss backdropClick={handleCloseModal} isFloating={true}>
        <div className="p-4 bg-white rounded relative flex flex-col items-center">
          <IconAlertDelete color="biru" />
          <h2 className="text-heading m semibold-21 mb-2">Barang Diterima</h2>
          <p className="text-paragraph regular-14 text-[#717171] mb-4">
            Apakah kamu sudah menerima barang yang dipinjam?
          </p>
          <div className="flex justify-center gap-4 items-end">
            <button
              className="bg-white border-[#235696] border text-[#235696] w-full min-w-[180px] max-h-[45px] px-12 py-3 rounded-md text-heading xs semibold-16"
              type="button"
              onClick={handleCloseModal}
            >
              Batal
            </button>
            <button
              className="bg-[#235696] border border-[#235696] text-white w-full min-w-[180px] max-h-[45px] px-2 py-3 rounded-md text-heading xs semibold-16"
              type="button"
              onClick={handleCloseModal}
            >
              Ya, Barang diterima
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
