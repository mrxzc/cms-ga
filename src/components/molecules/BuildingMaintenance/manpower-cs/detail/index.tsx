'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconSpinner from '@assets/icons/IconSpinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGetBuildingManagementCleaningServiceDetail } from '@services/building-management/cleaning-service/query'
import { useParams, useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { schema } from './schema'

export function Detail() {
  const router = useRouter()

  const paramsPage = useParams<{ noId: string }>()

  const { control } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const {
    data: meta,
    isFetching,
    isRefetching,
    isSuccess: isFetchSuccess,
    isError: isFetchError,
    isRefetchError,
    refetch,
  } = useGetBuildingManagementCleaningServiceDetail({ noId: paramsPage?.noId })

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/building-management/cleaning-service/manpower-cs')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Building Maintenance - Manpower CS</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Manpower CS Detail</div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 bg-white rounded-lg mb-4 p-6 relative">
            <p className="text-heading s semibold-18 mb-10">Request Manpower CS</p>

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
                    <p className="text-heading xs regular-16">Kategori Pengajuan</p>
                    <div className="col-span-3">
                      <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                        {meta?.data?.kategoriRequest}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                    <p className="text-heading xs regular-16">Nama Manpower Existing</p>
                    <div className="col-span-3">
                      <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                        {meta?.data?.nameManpowerExisting}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                    <p className="text-heading xs regular-16">Lama Bekerja</p>
                    <div className="col-span-3">
                      <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                        {meta?.data?.lamaKerja}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <p className="text-heading xs regular-16">Alasan</p>
                    <div className="col-span-3">
                      <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-24 p-3 rounded-md ">
                        {meta?.data?.reason}
                      </div>
                    </div>
                  </div>

                  <hr className="mt-2 mb-6" />

                  <form onSubmit={() => {}}>
                    <div>
                      <p className="text-heading xs regular-16 mb-3">
                        Note <span className="text-red-500">*</span>
                      </p>

                      <Controller
                        defaultValue={''}
                        control={control}
                        name={'notes'}
                        render={({ field, formState: { errors } }) => (
                          <div>
                            <div className="custom-textarea border border-[#CCCCCC] w-full flex items-center rounded-md overflow-hidden">
                              <textarea
                                required
                                placeholder="Masukan notes"
                                className="custom-textarea text-paragraph regular-14 w-full p-3"
                                rows={6}
                                {...field}
                              ></textarea>
                            </div>
                            <div className="flex justify-end text-paragraph regular-14 text-[#717171] my-2">
                              {field?.value?.length ?? 0}/240
                            </div>
                            {errors?.['notes']?.message && (
                              <span className="text-xs text-error">{errors?.['notes']?.message?.toString()}</span>
                            )}
                          </div>
                        )}
                      ></Controller>
                    </div>

                    <div className="my-8" />

                    <div className="pt-6 flex items-center justify-end space-x-3">
                      <button
                        type="submit"
                        className="bg-[#D92B41] text-white px-auto h-11 rounded-lg shadow-md min-w-[129px] text-heading xs regular-16"
                      >
                        Reject
                      </button>
                      <button
                        type="submit"
                        className="bg-[#235696] text-white px-auto h-11 rounded-lg shadow-md min-w-[129px] text-heading xs regular-16"
                      >
                        Approve
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-2 relative">
            <div className="bg-white rounded-lg mb-4 p-6 ">
              <p className="text-heading s semibold-18 mb-10">Tracking Detail - [Dummy Data]</p>

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
                      <div className="text-extra-small semibold-12 text-[#717171] mb-2">
                        waiting for approval status...
                      </div>
                    </div>

                    <div className="absolute w-4 h-4 rounded-full bg-[#0089CF] top-0 -left-2"></div>
                    <div className="absolute w-3 h-3 rounded-full bg-white top-0.5 -left-1.5"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-[#0089CF] top-1 -left-1"></div>
                  </div>
                  <div className="relative">
                    <div className="px-4 pb-8 border-l border-[#D9D9D9] relative">
                      <div className="text-paragraph semibold-14 mb-3">RROBH</div>
                      <div className="text-extra-small semibold-12 text-[#717171] mb-2">
                        waiting for approval status...
                      </div>
                    </div>

                    <div className="absolute w-4 h-4 rounded-full bg-[#D9D9D9] top-0 -left-2"></div>
                    <div className="absolute w-3 h-3 rounded-full bg-white top-0.5 -left-1.5"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-[#D9D9D9] top-1 -left-1"></div>
                  </div>
                  <div className="relative">
                    <div className="px-4 pb-8 border-l border-[#D9D9D9] relative">
                      <div className="text-paragraph semibold-14 mb-3">RODH</div>
                      <div className="text-extra-small semibold-12 text-[#717171] mb-2">
                        waiting for approval status...
                      </div>
                    </div>

                    <div className="absolute w-4 h-4 rounded-full bg-[#D9D9D9] top-0 -left-2"></div>
                    <div className="absolute w-3 h-3 rounded-full bg-white top-0.5 -left-1.5"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-[#D9D9D9] top-1 -left-1"></div>
                  </div>
                  <div className="relative">
                    <div className="px-4 pb-8 relative">
                      <div className="text-paragraph semibold-14 mb-3">GA</div>
                      <div className="text-extra-small semibold-12 text-[#717171] mb-2">
                        waiting for approval status...
                      </div>
                    </div>

                    <div className="absolute w-4 h-4 rounded-full bg-[#D9D9D9] top-0 -left-2"></div>
                    <div className="absolute w-3 h-3 rounded-full bg-white top-0.5 -left-1.5"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-[#D9D9D9] top-1 -left-1"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
