'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import IconChevronRight from '@assets/icons/IconChevronRight'
import { data } from './data'
import { MonitoringDataCleaningSecurity } from '@interfaces/monitoringDetail'

export function Detail() {
  const [requestData, setRequestData] = useState<MonitoringDataCleaningSecurity | undefined>()

  const router = useRouter()
  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  useEffect(() => {
    if (slug) {
      // Find the request data that matches the slug (assuming 'no' is the unique identifier)
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

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/monitoring/management/security-guard')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Monitoring Pesanan - Security Guard</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Security Guard Detail</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Request Security Guard</p>

          <div>
            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Tanggal Pengajuan</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.tanggalPengajuan}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Nama</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.nama}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Lokasi</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.lokasi}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Area</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.area}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Cabang</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.cabang}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Kategori Pengajuan</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.kategoriPengajuan}
                </div>
              </div>
            </div>

            {requestData?.kategoriPengajuan === 'Additional' && (
              <>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Shift Existing</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.shiftExisting}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Penambahan Manpower</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.penambahanManpower}
                    </div>
                  </div>
                </div>
              </>
            )}

            {requestData?.kategoriPengajuan === 'Refreshment' && (
              <>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Nama Manpower Existing</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.nama}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Lama Bekerja </p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.lamaBekerja}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Alasan </p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[120px] p-3 rounded-md ">
                  {requestData?.alasan}
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
        </div>
      </div>
    </div>
  )
}
