'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconSpinner from '@assets/icons/IconSpinner'
import { useGetDetailAsset } from '@services/monitoring/asset/query'
import { useParams, useRouter } from 'next/navigation'
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

  const paramsPage = useParams<{ asset: string }>()

  const {
    data,
    isFetching,
    isRefetching,
    isSuccess: isFetchSuccess,
    isError: isFetchError,
    isRefetchError,
    refetch,
  } = useGetDetailAsset({ noIdBooking: paramsPage?.asset })

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/monitoring/asset')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Monitoring Pesanan - Asset</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Asset Detail</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Request Asset</p>

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
                <p className="text-heading xs regular-16">Nama</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {data?.data?.name}
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
                <p className="text-heading xs regular-16">Status</p>
                <div className="col-span-3">
                  <span className="text-error"> No Data</span>
                  {/* <div>
                    <div className="max-w-40 text-center rounded bg-[#D3FED7] text-[#4EC558] border border-[#4EC558] text-paragraph semibold-14 px-1 py-2">
                      {data?.data?.status}
                      Dummy
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Detail Asset yang dipesan</p>

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
              <div className="grid grid-cols-4 gap-4 mb-6">
                <p className="text-heading xs regular-16">
                  Produk total:{' '}
                  {data?.data?.produkTotal && <span className="font-semibold">{data?.data?.produkTotal}</span>}
                </p>
                <div className="col-span-2">
                  <span className="text-error"> No Data</span>

                  {/* <div
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
                      Proyektor
                    </div>
                    <div
                      className={`overflow-hidden flex-1 text-[#717171] relative bg-[#EFF2F5] border border-[#E6E5E6] ${
                        isDropdownOpen ? 'rounded-r-md rounded-bl-md' : 'rounded-r-md'
                      }`}
                    >
                      <div className="flex items-center p-3">
                        <div className="flex-1 ">12 Items</div>
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
                  <div className="my-3"></div>
                  <div className="text-paragraph semibold-14 min-h-[44px] flex overflow-hidden">
                    <div className="border-l border-y border-[#E6E5E6] bg-[#F5F8FA] h-full w-24 py-3 text-center text-[#3F4254] rounded-l-md">
                      Meja
                    </div>
                    <div
                      className={`flex-1 text-[#717171] relative bg-[#EFF2F5] border border-[#E6E5E6] rounded-r-md 
                     `}
                    >
                      <div className="flex items-center p-3">
                        <div className="flex-1 ">1 Items</div>
                      </div>
                    </div>
                  </div>
                  <div className="my-3"></div>
                  <div className="text-paragraph semibold-14 min-h-[44px] flex overflow-hidden">
                    <div className="border-l border-y border-[#E6E5E6] bg-[#F5F8FA] h-full w-24 py-3 text-center text-[#3F4254] rounded-l-md">
                      Kursi
                    </div>
                    <div
                      className={`flex-1 text-[#717171] relative bg-[#EFF2F5] border border-[#E6E5E6] rounded-r-md 
                     `}
                    >
                      <div className="flex items-center p-3">
                        <div className="flex-1 ">3 Items</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
