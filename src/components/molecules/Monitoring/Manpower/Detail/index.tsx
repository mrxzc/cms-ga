'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconSpinner from '@assets/icons/IconSpinner'
import { ManpowerMonitoringStatusClassEnum } from '@services/monitoring/manpower/enums'
import { useGetDetailManpower } from '@services/monitoring/manpower/query'
import { useParams, useRouter } from 'next/navigation'

export function Detail() {
  const router = useRouter()

  const paramsPage = useParams<{ manpower: string }>()

  const statusEnums = new ManpowerMonitoringStatusClassEnum()

  const {
    data,
    isFetching,
    isRefetching,
    isSuccess: isFetchSuccess,
    isError: isFetchError,
    isRefetchError,
    refetch,
  } = useGetDetailManpower({ noIdBooking: paramsPage?.manpower })

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/monitoring/manpower')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Monitoring Pesanan - Manpower</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Manpower Detail</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Request Manpower</p>

          {(isFetching || isRefetching) && (
            <div className="flex items-center justify-center my-20">
              <IconSpinner width={100} height={100} className="animate-spin"></IconSpinner>
            </div>
          )}

          {(isFetchError || isRefetchError) && (
            <div className="w-full flex flex-col justify-center items-center my-20">
              <div className="text-heading s semibold-18 mb-2">Tidak ada data</div>
              <div className="text-extra-small regular-12 mb-4">Saat ini belum ada yang tersedia</div>
              <button
                onClick={() => {
                  refetch()
                }}
                type="button"
                className="next-button h-8 px-4 rounded-lg w-auto text-extra-small semibold-12 text-[#FFFFFF] flex items-center justify-center"
              >
                Reload
              </button>
            </div>
          )}

          {isFetchSuccess && data?.data && (
            <div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Tanggal Pengajuan</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.tanggalPengajuan}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Kategori Manpower</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.kategoriManpower}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Nama</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.nama}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Gender</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.gender}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Lokasi</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.lokasi}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Tanggal Booking</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.tanggalBooking}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Waktu Booking</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.jamBooking}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Keperluan</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.keperluan}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Kebutuhan Manpower</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.kebutuhanManpower}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Status</p>
                <div className="col-span-3">
                  {data?.data?.status && (
                    <div>
                      <div
                        className={`max-w-40 text-center rounded ${
                          statusEnums.find(data?.data?.status)?.badgeColor
                        } text-paragraph semibold-14 px-1 py-2`}
                      >
                        {statusEnums.find(data?.data?.status)?.text}
                      </div>
                    </div>
                  )}
                  {!data?.data?.status && <div className={`text-error`}>No Data</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
