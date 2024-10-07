'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconCloudUploadFill from '@assets/icons/IconCloudUploadFill'
import { useRouter } from 'next/navigation'
import { data } from './data'

export function Detail() {
  const router = useRouter()

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
              router.push('/monitoring/room')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Monitoring Pesanan - Penganjuan Perbaikan</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Penganjuan Perbaikan Detail</div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 bg-white rounded-lg mb-4 p-6 relative">
            <p className="text-heading s semibold-18 mb-10">Request Penganjuan Perbaikan</p>

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

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Estimasi Cost</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.estimationCost}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Deskripsi</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-32 p-3 rounded-md ">
                      {data?.description}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">File Pengajuan Perbaikan</p>
                  <div className="col-span-3">
                    {/* <div className="text-paragraph regular-14 text-[#B1B1B1]">No Data</div> */}
                    <button className="flex items-center space-x-2 bg-[#0089CF] px-3 py-2.5 rounded">
                      <IconCloudUploadFill color="white"></IconCloudUploadFill>
                      <span className="text-white text-heading xs regular-16">Download</span>
                    </button>
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
            </>
            {/* )} */}
          </div>

          <div className="col-span-2 bg-white rounded-lg mb-4 p-6 relative">
            <p className="text-heading s semibold-18 mb-10">Tracking Detail </p>
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
              <div className="relative">
                <div className="px-4 pb-8 border-l border-[#0089CF] relative">
                  <span className="text-ultra-small semibold-10 text-[#0089CF] bg-[#E5F2FC] border border-[#78B3F0] px-1.5 py-1 rounded-md">
                    Approve
                  </span>
                  <div className="text-paragraph semibold-14 mb-1 mt-4">JOHN DOE</div>
                  <div className="text-extra-small regular-12 mb-3">CRSH</div>
                  <div className="text-extra-small semibold-12 text-[#717171] mb-2">
                    Give approval status for this request on 15-02-2024 18:00 WIB with notes
                  </div>
                  <div className="text-extra-small regular-12 text-[#0089CF]">Oke</div>
                </div>
                <div className="absolute w-4 h-4 rounded-full bg-[#0089CF] top-0 -left-2"></div>
              </div>
              <div className="relative">
                <div className="px-4 pb-8 border-l border-[#D9D9D9] relative">
                  <div className="text-paragraph semibold-14 mb-3">BM</div>
                  <div className="text-extra-small semibold-12 text-[#717171] mb-2">waiting for approval status...</div>
                </div>

                <div className="absolute w-4 h-4 rounded-full bg-[#0089CF] top-0 -left-2"></div>
                <div className="absolute w-3 h-3 rounded-full bg-white top-0.5 -left-1.5"></div>
                <div className="absolute w-2 h-2 rounded-full bg-[#0089CF] top-1 -left-1"></div>
              </div>
              <div className="relative">
                <div className="px-4 pb-8 border-l border-[#D9D9D9] relative">
                  <div className="text-paragraph semibold-14 mb-3">RROBH</div>
                  <div className="text-extra-small semibold-12 text-[#717171] mb-2">waiting for approval status...</div>
                </div>

                <div className="absolute w-4 h-4 rounded-full bg-[#D9D9D9] top-0 -left-2"></div>
                <div className="absolute w-3 h-3 rounded-full bg-white top-0.5 -left-1.5"></div>
                <div className="absolute w-2 h-2 rounded-full bg-[#D9D9D9] top-1 -left-1"></div>
              </div>
              <div className="relative">
                <div className="px-4 pb-8 border-l border-[#D9D9D9] relative">
                  <div className="text-paragraph semibold-14 mb-3">RODH</div>
                  <div className="text-extra-small semibold-12 text-[#717171] mb-2">waiting for approval status...</div>
                </div>

                <div className="absolute w-4 h-4 rounded-full bg-[#D9D9D9] top-0 -left-2"></div>
                <div className="absolute w-3 h-3 rounded-full bg-white top-0.5 -left-1.5"></div>
                <div className="absolute w-2 h-2 rounded-full bg-[#D9D9D9] top-1 -left-1"></div>
              </div>
              <div className="relative">
                <div className="px-4 pb-8 relative">
                  <div className="text-paragraph semibold-14 mb-3">GA</div>
                  <div className="text-extra-small semibold-12 text-[#717171] mb-2">waiting for approval status...</div>
                </div>

                <div className="absolute w-4 h-4 rounded-full bg-[#D9D9D9] top-0 -left-2"></div>
                <div className="absolute w-3 h-3 rounded-full bg-white top-0.5 -left-1.5"></div>
                <div className="absolute w-2 h-2 rounded-full bg-[#D9D9D9] top-1 -left-1"></div>
              </div>
            </>
            {/* )} */}
          </div>
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
