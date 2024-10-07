'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import { useRouter } from 'next/navigation'
import { data } from './data'
import IconChevronBottom from '@assets/icons/IconChevronBottom'
import { useEffect, useRef, useState } from 'react'

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
              router.push('/monitoring/Asset')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Monitoring Pesanan - Report Kondisi Cabang</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Report Kondisi Cabang Detail</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Report Kondisi Cabang</p>

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

              <div className="grid grid-cols-4 gap-4 mb-6 ">
                <p className="text-heading xs regular-16">Keperluan</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-20 p-3 rounded-md ">
                    {data?.description}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <p className="text-heading xs regular-16">Foto Kondisi Cabang</p>
                <div className="col-span-2">
                  <div
                    ref={dropdownRef}
                    onKeyDown={() => {}}
                    role="button"
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen)
                    }}
                    className={`text-paragraph semibold-14 ${
                      isDropdownOpen ? 'min-h-[44px]' : 'max-h-[44px]'
                    }  flex overflow-hidden`}
                  >
                    <div className="border-l border-y border-[#E6E5E6] bg-[#F5F8FA] h-full w-24 py-3 text-center text-[#3F4254] rounded-l-md">
                      Halaman
                    </div>
                    <div
                      className={`overflow-hidden flex-1 text-[#717171] relative bg-[#EFF2F5] border border-[#E6E5E6] ${
                        isDropdownOpen ? 'rounded-r-md rounded-bl-md' : 'rounded-r-md'
                      }`}
                    >
                      <div className="flex items-center p-3">
                        <div className="flex-1 ">3 Foto</div>
                        <button className="bg-[#EFF2F5]">
                          <IconChevronBottom
                            width={20}
                            height={20}
                            className={`${
                              isDropdownOpen ? 'rotate-180' : 'rotate-0'
                            } -mt-1 transition-all duration-300`}
                          ></IconChevronBottom>
                        </button>
                      </div>
                      <div className={`${isDropdownOpen ? '' : 'hidden'}`}>
                        <div className={`${isDropdownOpen ? '' : 'hidden'} bg-[#EFF2F5] border-t border-[#E6E5E6] p-3`}>
                          <div className="pl-6">
                            <span className="pr-1">&#x2022;</span> Epson : 6 Items
                          </div>
                        </div>
                        <div className={`${isDropdownOpen ? '' : 'hidden'} bg-[#EFF2F5] border-t border-[#E6E5E6] p-3`}>
                          <div className="pl-6">
                            <span className="pr-1">&#x2022;</span> Panasonic : 6 Items
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
