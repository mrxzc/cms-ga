'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconSpinner from '@assets/icons/IconSpinner'
import { useGetBuildingManagementWaterMeterDetail } from '@services/building-management/water-meter/query'
import { useParams, useRouter } from 'next/navigation'

export function Detail() {
  const router = useRouter()

  const paramsPage = useParams<{ wasteManagement: string }>()

  const {
    data: meta,
    isFetching,
    isRefetching,
    isSuccess: isFetchSuccess,
    isError: isFetchError,
    isRefetchError,
    refetch,
  } = useGetBuildingManagementWaterMeterDetail({ noId: paramsPage?.wasteManagement })

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/building-management/ehs/water-management')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Building Maintenance - Pengunaan Air</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Pengunaan Air Detail</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Request Pengunaan Air</p>

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

          {isFetchSuccess && meta?.data && (
            <div>
              <div>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Tanggal Pengajuan</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {meta?.data?.dateRequest}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Nama</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {meta?.data?.requestor}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Lokasi</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {meta?.data?.location}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Area</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {meta?.data?.area}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Cabang</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {meta?.data?.descSp}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Water Meter Existing</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {meta?.data?.waterMeterExisting} m3
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Water Meter Request</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {meta?.data?.waterMeterRequest} m3
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Tanggal Update Terakhir</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {meta?.data?.lastUpdateDate}
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
