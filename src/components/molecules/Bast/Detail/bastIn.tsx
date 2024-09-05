'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconClose from '@assets/icons/IconClose'
import IconSpinner from '@assets/icons/IconSpinner'
import { Modal } from '@components/atoms/ModalCustom'
import { IOTPLoginResponse } from '@interfaces/auth'
import { useGetDetailBastIn } from '@services/bast/query'
import { GetCookie } from '@store/storage'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export function Detail() {
  const router = useRouter()

  const dataUser: IOTPLoginResponse = GetCookie('data_user')

  const paramsPage = useParams<{ noIdSecurity: string }>()

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false)

  const {
    data,
    isFetching,
    isRefetching,
    isSuccess: isFetchSuccess,
    isError: isFetchError,
    isRefetchError,
    refetch,
  } = useGetDetailBastIn({ noIdSecurity: paramsPage?.noIdSecurity }, dataUser?.idUser)

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/management/form-bast')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Booking Asset Data - Form BAST</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Form Masuk Kendaraan Detail</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Form Masuk Kendaraan</p>

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
            <>
              <div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">KM Kembali</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.kmBack}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Jam Mibol Keluar</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.outTime}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Kondisi Mobil Setelah Keluar</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md min-h-36">
                      {data?.data?.condition}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Foto Kondisi BBM</p>
                  <div className="col-span-3">
                    {data?.data?.fuelCondition && (
                      <Image
                        onKeyDown={() => {}}
                        onClick={() => {
                          setIsPhotoModalOpen(true)
                        }}
                        alt="fuelContidion-key"
                        src={data?.data?.fuelCondition}
                        height={100}
                        width={100}
                        className="w-[169px] h-[110px] object-cover rounded-md"
                      ></Image>
                    )}
                    {!data?.data?.fuelCondition && (
                      <div
                        onKeyDown={() => {}}
                        onClick={() => {
                          setIsPhotoModalOpen(true)
                        }}
                        className="w-[169px] h-[110px] bg-gray-200 rounded-md"
                      ></div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Isi BBM</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md min-h-36">
                      {data?.data?.refuel}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Foto 4 sisi mobil</p>
                  <div className="col-span-3 w-full flex items-center space-x-3 overflow-x-auto">
                    {data?.data?.photos?.length &&
                      data?.data?.photos?.map((photo: string, index: number) => {
                        if (photo) {
                          return (
                            <Image
                              onKeyDown={() => {}}
                              onClick={() => {
                                setIsPhotoModalOpen(true)
                              }}
                              key={index}
                              alt={`side-${index}`}
                              src={photo}
                              height={100}
                              width={100}
                              className="min-w-[169px] h-[110px] object-cover rounded-md"
                            ></Image>
                          )
                        }

                        return (
                          <div
                            key={index}
                            onKeyDown={() => {}}
                            onClick={() => {
                              setIsPhotoModalOpen(true)
                            }}
                            className="min-w-[169px] h-[110px] bg-gray-200 rounded-md"
                          ></div>
                        )
                      })}
                    {!data?.data?.photos?.length && (
                      <div
                        onKeyDown={() => {}}
                        onClick={() => {
                          setIsPhotoModalOpen(true)
                        }}
                        className="min-w-[169px] h-[110px] bg-gray-200 rounded-md"
                      ></div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Deskripsikan kondisi foto mobil</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md min-h-36">
                      {data?.data?.description}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
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

          {isFetchSuccess && data?.data && (
            <>
              <div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Dengan Driver</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.withDriver}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Tanggal Booking</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.bookingDate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Waktu Booking</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.bookingTime}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Lokasi Vehicle</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.location}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Detail Unit</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.detailUnit}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Kapasitas Mobil</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.capacity}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Transmisi</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.transmision}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Plat Nomor</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.plateNumber}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <p className="text-heading xs regular-16">Bensin</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {data?.data?.fuel}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Confirmation Modal */}
        <Modal
          isOpen={isPhotoModalOpen}
          backdropClick={() => {
            setIsPhotoModalOpen(false)
          }}
        >
          <div className="bg-[#14232A] relative -m-6 p-6 text-center rounded-xl justify-center">
            <button
              type="button"
              onClick={() => {
                setIsPhotoModalOpen(false)
              }}
              className="absolute top-4 right-4"
            >
              <IconClose color="#ffffff" width={24} height={24}></IconClose>
            </button>
            <div className="flex justify-center py-10">
              {data?.data?.fuelCondition && (
                <Image
                  alt="fuelContidion-key"
                  src={data?.data?.fuelCondition}
                  height={100}
                  width={100}
                  className="w-80 h-48 object-cover rounded-md"
                ></Image>
              )}
              {!data?.data?.fuelCondition && <div className="w-80 h-48 bg-gray-200 rounded-md"></div>}
            </div>
          </div>
        </Modal>
        {/* Confirmation Modal */}
      </div>
    </div>
  )
}
