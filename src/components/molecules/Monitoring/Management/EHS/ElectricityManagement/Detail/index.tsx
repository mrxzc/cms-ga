'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import { useRouter } from 'next/navigation'
import { data } from './data'

export function Detail() {
  const router = useRouter()

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/monitoring/room')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Monitoring Pesanan - Penggunaan Listrik</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Penggunaan Listrik Detail</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Request Penggunaan Listrik</p>

          <div>
            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Tanggal Pengajuan</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {data?.tanggalPengajuan}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Nama</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {data?.nama}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Lokasi</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {data?.lokasi}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Area</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {data?.area}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Cabang</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {data?.cabang}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">KWH Meter Existing</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {data?.kwhMeterExisting}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">KWH Meter Request</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {data?.kwhMeterRequest}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Tanggal Update Terakhir</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {data?.tanggalUpdate}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Status</p>
              <div className="col-span-3">
                <div>
                  <div className="max-w-40 text-center rounded bg-[#D3FED7] text-[#4EC558] border border-[#4EC558] text-paragraph semibold-14 px-1 py-2">
                    {data?.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
