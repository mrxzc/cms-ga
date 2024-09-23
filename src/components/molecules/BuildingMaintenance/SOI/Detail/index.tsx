'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { data } from './data'

export function Detail() {
  const router = useRouter()

  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleClick = (event: any) => {
      if (!dropdownRef?.current?.contains(event?.target)) {
        setIsDropdownOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isDropdownOpen])

  // const dataUser: IOTPLoginResponse = GetCookie('data_user')

  // const paramsPage = useParams<{ noIdSecurity: string }>()

  // const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false)

  // const {
  //   data,
  //   isFetching,
  //   isRefetching,
  //   isSuccess: isFetchSuccess,
  //   isError: isFetchError,
  //   isRefetchError,
  //   refetch,
  // } = useGetDetailBastIn({ noIdSecurity: paramsPage?.noIdSecurity }, dataUser?.idUser)

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/building-management/building-maintenance/soi')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Building Maintenance - SOI</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">SOI Detail</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Request SOI</p>

          {/* {(isFetching || isRefetching) && (
            <div className="flex items-center justify-center my-20">
              <IconSpinner width={100} height={100} className="animate-spin"></IconSpinner>
            </div>
          )} */}

          {/* {(isFetchError || isRefetchError) && (
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
          )} */}

          {/* {isFetchSuccess && data && ( */}
          <>
            <div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Tanggal Pengajuan</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.dtUpload}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Nama</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.name}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Lokasi</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.location}
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
                    {data?.branch}
                  </div>
                </div>
              </div>
            </div>
          </>
          {/* )} */}
        </div>

        <div className="my-6"></div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Form Penilaian</p>

          {/* {(isFetching || isRefetching) && (
            <div className="flex items-center justify-center my-20">
              <IconSpinner width={100} height={100} className="animate-spin"></IconSpinner>
            </div>
          )} */}

          {/* {(isFetchError || isRefetchError) && (
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
          )} */}

          {/* {isFetchSuccess && data && ( */}
          <>
            <div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Kerapihan</p>
                <div className="col-span-1">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    1
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Kedisiplinan</p>
                <div className="col-span-1">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    1
                  </div>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-end space-x-3">
                <button className="bg-[#D92B41] text-white px-auto h-11 rounded-lg shadow-md min-w-[129px] text-heading xs regular-16">
                  Reject
                </button>
                <button className="bg-[#235696] text-white px-auto h-11 rounded-lg shadow-md min-w-[129px] text-heading xs regular-16">
                  Approve
                </button>
              </div>
            </div>
          </>
          {/* )} */}
        </div>

        {/* <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Detail Vehicle yang dipesan</p>

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

          {isFetchSuccess && data && (
            <>
              <div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Dengan Driver</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.withDriver}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Tanggal Booking</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.bookingDate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Waktu Booking</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.bookingTime}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Lokasi Vehicle</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.location}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Detail Unit</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.detailUnit}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Kapasitas Mobil</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.capacity}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Transmisi</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.transmision}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Plat Nomor</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.plateNumber}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Bensin</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.fuel}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div> */}
      </div>
    </div>
  )
}
