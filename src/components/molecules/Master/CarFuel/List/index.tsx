'use client'

import IconDownload from '@assets/icons/IconDownload'
import IconEditing from '@assets/icons/IconEditing'
import IconPlus from '@assets/icons/IconPlus'
import IconSearch from '@assets/icons/IconSearch'
import IconSpinner from '@assets/icons/IconSpinner'
import IconTrashOutline from '@assets/icons/IconTrashOutline'
import confirmationDanger from '@assets/images/ConfirmationDanger.png'
import { Modal } from '@components/atoms/ModalCustom'
import Pagination from '@components/atoms/Pagination'
import { IOTPLoginResponse } from '@interfaces/auth'
import {
  IGcmCarFuel,
  IGcmCarFuelDeletePayload,
  IGcmCarFuelListParams,
  IGcmCarFuelToggleStatusPayload,
} from '@interfaces/gcmCarFuel'
import { useMutateDeleteCarFuel, useMutateToggleStatusCarFuel } from '@services/gcm/carFuel/mutation'
import { useGetCarFuel } from '@services/gcm/carFuel/query'
import { GetCookie } from '@store/storage'
import { dummiesArray } from '@utils/common'
import { debounce } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export function List() {
  const router = useRouter()

  const dataUser: IOTPLoginResponse = GetCookie('data_user')

  const [isConfimationModalOpen, setIsConfimationModalOpen] = useState<boolean>(false)

  const [keywords, setKeywords] = useState<string>()

  const [selectedCarFuel, setSelectedCarFuel] = useState<IGcmCarFuel>()

  const defaultParams = {
    search: '',
    page: 1,
    size: 10,
  }
  const [params, setParams] = useState<IGcmCarFuelListParams>(defaultParams)

  const { data, isFetching, refetch } = useGetCarFuel(params, dataUser?.idUser)

  const { mutate: mutateToggle, isSuccess: isToggleSuccess, reset: toggleReset } = useMutateToggleStatusCarFuel()
  const {
    mutate: mutateDelete,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    reset: deleteReset,
  } = useMutateDeleteCarFuel()

  const handleSearch = useCallback(
    debounce(input => {
      setParams({ page: 1, size: 10, search: input })
    }, 500),
    []
  )

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsConfimationModalOpen(false)
      deleteReset()
    }
  }, [isDeleteSuccess])

  useEffect(() => {
    if (isToggleSuccess) {
      toggleReset()
    }
  }, [isToggleSuccess])

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8">
        <div className="bg-white px-6 py-3 rounded mb-4 flex justify-between">
          <div className="text-extra-small regular-12">Master Data - Manage Bahan Bakar</div>
          <div className="flex">
            <button type="button" className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]">
              <IconDownload className="-mt-0.5" />
              <span>Download</span>
            </button>
            <div className="divider divider-horizontal" />
            <button
              type="button"
              className="flex gap-1.5 items-center text-extra-small regular-12 text-[#252525]"
              onClick={() => router.push('/master/car-fuel/add')}
            >
              <IconPlus color="white" className="bg-[#505050] p-1 rounded-full -mt-0.5" width={16} height={16} />
              <span>Add New</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <div className="text-heading s semibold-18 mb-6">Master Data Bahan Bakar</div>

          {/* Table controller */}
          <div className="mb-4">
            <div className="search-input h-[38px]  max-w-[402px]  mb-6 px-3 flex items-center justify-center space-x-3 border border-[#D5D5D5] rounded-lg">
              <IconSearch color="#909090" />

              <input
                type="text"
                placeholder="Cari bahan bakar"
                className="flex-1 text-paragraph regular-14 mt-1"
                value={keywords ?? ''}
                onChange={e => {
                  setKeywords(e?.target?.value)
                  handleSearch(e?.target?.value)
                }}
              />
            </div>
          </div>
          {/* Table controller */}

          {/* Table */}
          {isFetching && (
            <div className="relative mb-6">
              <div className="rounded-lg border border-[#E6E5E6] overflow-auto">
                <table className="table-fixed custom-table">
                  <thead className="table-head text-heading xs semibold-16">
                    <tr>
                      <th>No</th>
                      <th>Title</th>
                      <th className="text-center">Tanggal Upload</th>
                      <th className="text-center">Status</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-body text-paragraph regular-14">
                    {dummiesArray().map(val => (
                      <tr key={`location-${val}`} className="animate-pulse">
                        <td className="min-w-[80px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="min-w-[300px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[264px] ">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[360px] w-full">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[100px] w-full">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!isFetching && data?.data?.length ? (
            <div className="relative mb-6">
              <div className="rounded-lg border border-[#E6E5E6] overflow-auto">
                <table className="table-fixed custom-table">
                  <thead className="table-head text-heading xs semibold-16">
                    <tr>
                      <th>No</th>
                      <th>Title</th>
                      <th className="text-center">Tanggal Upload</th>
                      <th className="text-center">Status</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-body text-paragraph regular-14">
                    {data?.data?.map((location: IGcmCarFuel, index, arr) => (
                      <tr
                        key={`location-${location?.noSr}`}
                        className={`${index != arr.length - 1 ? 'border-b border-[#E6E5E6]' : ''}`}
                      >
                        <td className="min-w-[80px]">{location?.noSr}</td>
                        <td className="min-w-[300px]">{location?.descGcm}</td>
                        <td className="text-center min-w-[264px] ">{location?.dtUpload}</td>
                        <td className="text-center min-w-[360px] w-full">
                          <label className="switch">
                            <input
                              name={`checkbox-${location?.noSr}`}
                              defaultChecked={location?.flagActive}
                              type="checkbox"
                              onChange={val => {
                                const payload: IGcmCarFuelToggleStatusPayload = {
                                  noSr: location?.noSr,
                                  flagActive: val?.target?.checked,
                                }
                                mutateToggle({ payload, idUser: dataUser?.idUser })
                              }}
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td className="text-center min-w-[100px] w-full">
                          <div className="float-right">
                            <button
                              type="button"
                              className="mr-3"
                              onClick={() => {
                                router.push(`/master/car-fuel/${location?.noSr}/edit`)
                              }}
                            >
                              <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCarFuel(location)
                                setIsConfimationModalOpen(true)
                              }}
                            >
                              <IconTrashOutline width={20} height={20} className="hover:cursor-pointer" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {!isFetching && !data?.data?.length ? (
            <div className="w-full flex flex-col justify-center items-center my-20">
              <div className="text-heading s semibold-18 mb-2">Tidak ada data</div>
              <div className="text-extra-small regular-12 mb-4">Saat ini belum ada yang tersedia</div>
              <button
                onClick={() => {
                  if (params != defaultParams) {
                    refetch()
                    return
                  }
                  setKeywords('')
                  setParams({ page: 1, size: 10, search: '' })
                }}
                type="button"
                className="next-button h-8 px-4 rounded-lg w-auto text-extra-small semibold-12 text-[#FFFFFF] flex items-center justify-center"
              >
                Reload
              </button>
            </div>
          ) : null}
          {/* Table */}

          {/* Pagination */}
          <Pagination
            isLoading={isFetching}
            pagination={data?.pagination}
            clicked={(page: number) => {
              setParams({ ...params, page })
            }}
          ></Pagination>
          {/* Pagination */}

          {/* Confirmation Modal */}

          <Modal
            isOpen={isConfimationModalOpen}
            backdropClick={() => {
              if (!isDeletePending) {
                setIsConfimationModalOpen(!isConfimationModalOpen)
              }
            }}
          >
            <div className="bg-white relative p-6 text-center rounded-xl justify-center">
              <div>
                <Image
                  width={0}
                  height={0}
                  sizes="100"
                  src={confirmationDanger.src}
                  className="mx-auto mb-4 w-28 h-28"
                  alt="confirmation"
                />
              </div>
              <div className="text-heading s semibold-18 text-[#252525] mb-1">Konfirmasi hapus data</div>
              <div className="text-paragraph regular-14 text-[#717171] mb-8 px-3">
                Data yang akan dihapus tidak akan bisa dikembalikan. Yakin ingin melanjutkan?
              </div>

              <div className="flex justify-center items-center space-x-3">
                <button
                  disabled={isDeletePending || isDeleteSuccess}
                  className={`${
                    isDeletePending || isDeleteSuccess ? 'opacity-50' : ''
                  } text-[#EA394B] border border-[#EA394B] flex-1 max-h-[45px] px-12 py-3 rounded-xl`}
                  type="button"
                  onClick={() => {
                    setIsConfimationModalOpen(false)
                  }}
                >
                  Batal
                </button>
                <button
                  disabled={isDeletePending || isDeleteSuccess}
                  className={`${
                    isDeletePending || isDeleteSuccess ? 'opacity-50' : ''
                  } bg-[#EA394B] text-white flex-1 max-h-[45px] px-12 py-3 rounded-xl flex items-center justify-center`}
                  type="button"
                  onClick={() => {
                    if (selectedCarFuel) {
                      const payload: IGcmCarFuelDeletePayload = {
                        noSr: selectedCarFuel?.noSr,
                        flagActive: false,
                      }
                      mutateDelete({ payload, idUser: dataUser?.idUser })
                    }
                  }}
                >
                  {isDeletePending && <IconSpinner color={'#fbfafa'} className="animate-spin" />}
                  {!isDeletePending && 'Ya, Hapus'}
                </button>
              </div>
            </div>
          </Modal>
          {/* Confirmation Modal */}
        </div>
      </div>
    </div>
  )
}
