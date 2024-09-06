'use client'

import IconChevronBottom from '@assets/icons/IconChevronBottom'
import IconEye from '@assets/icons/IconEye'
import IconFilter from '@assets/icons/IconFilter'
import IconSearch from '@assets/icons/IconSearch'
import Pagination from '@components/atoms/Pagination'
import { IOTPLoginResponse } from '@interfaces/auth'
import { IListBastParams } from '@interfaces/bast'
import { useGetListBast } from '@services/bast/query'
import { GetCookie } from '@store/storage'
import { dummiesArray } from '@utils/common'
import { debounce } from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

export function List() {
  const router = useRouter()

  const dataUser: IOTPLoginResponse = GetCookie('data_user')

  const inputStartDateRef = useRef<any>(null)
  const inputEndDateRef = useRef<any>(null)
  const inputStartDateContainerRef = useRef<HTMLDivElement>(null)
  const inputEndDateContainerRef = useRef<HTMLDivElement>(null)

  const [isStartDateOpen, setIsStartDateOpen] = useState<boolean>(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState<boolean>(false)

  const [keywords, setKeywords] = useState<string>()

  const defaultParams: IListBastParams = {
    startDate: '',
    endDate: '',
    categoryForm: '',
    search: '',
    page: 1,
    size: 10,
  }
  const [params, setParams] = useState<IListBastParams>(defaultParams)

  const { data, isFetching, refetch } = useGetListBast(params, dataUser?.idUser)

  const handleSearch = useCallback(
    debounce(input => {
      setParams({ ...params, page: 1, size: 10, search: input })
    }, 500),
    []
  )

  useEffect(() => {
    const handleClick = (event: any) => {
      if (!inputStartDateContainerRef?.current?.contains(event?.target)) {
        setIsStartDateOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isStartDateOpen])

  useEffect(() => {
    const handleClick = (event: any) => {
      if (!inputEndDateContainerRef?.current?.contains(event?.target)) {
        setIsEndDateOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isEndDateOpen])

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8">
        <div className="bg-white px-6 py-3 rounded mb-4 flex justify-between">
          <div className="text-extra-small regular-12">Booking Asset Data - Form BAST</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <div className="text-heading s semibold-18 mb-6">Form BAST</div>

          {/* Table controller */}
          <div className="mb-4">
            <div className="mb-4">
              <div className="flex items-center rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    setParams({ ...params, categoryForm: 'Bast Out' })
                  }}
                  className={`border ${
                    params?.categoryForm === 'Bast Out'
                      ? 'bg-[#235696] border-[#235696] text-white'
                      : 'border-[#D5D5D5] text-[#717171]'
                  }  rounded-l-lg text-heading xs regular-16 p-3`}
                >
                  Form Keluar Kendaraan
                </button>
                <button
                  onClick={() => {
                    setParams({ ...params, categoryForm: 'Bast In' })
                  }}
                  className={`${
                    params?.categoryForm === 'Bast In'
                      ? 'bg-[#235696] border-y border-r border-[#235696] text-white'
                      : 'border-y border-r border-[#D5D5D5] text-[#717171]'
                  }  rounded-r-lg text-heading xs regular-16 p-3`}
                >
                  Form Masuk Kendaraan
                </button>
              </div>
            </div>

            <div className="search-input h-[38px]  max-w-[402px] mb-6 px-3 flex items-center justify-center space-x-3 border border-[#D5D5D5] rounded-lg">
              <IconSearch color="#909090" />

              <input
                type="text"
                placeholder="Cari"
                className="flex-1 text-paragraph regular-14 mt-1"
                value={keywords ?? ''}
                onChange={e => {
                  setKeywords(e?.target?.value)
                  handleSearch(e?.target?.value)
                }}
              />
            </div>

            <div className="flex items-center space-x-2">
              <div ref={inputStartDateContainerRef}>
                <div className="text-paragraph regular-14 mb-1">Start Date</div>
                <div
                  onKeyDown={() => {}}
                  onClick={() => {
                    setIsStartDateOpen(true)
                    inputStartDateRef?.current?.showPicker()
                  }}
                  className="transition-all duration-300 cursor-pointer search-input h-[38px] w-auto px-3 flex items-center justify-center space-x-3 border border-[#D5D5D5] rounded"
                >
                  <span
                    className={`text-paragraph regular-14 ${
                      params?.startDate ? 'text-[#0C0C0C]' : 'text-[#B1B1B1]'
                    } mr-2`}
                  >
                    {params?.startDate ? moment(params?.startDate).format('DD/MM/YYYY').toString() : 'DD/MM/YYYY'}
                  </span>
                  <IconChevronBottom
                    width={21}
                    height={21}
                    className={`${isStartDateOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}
                  ></IconChevronBottom>
                </div>
                <input
                  ref={inputStartDateRef}
                  className="h-0 w-0"
                  type="date"
                  onChange={e => {
                    setParams({
                      ...params,
                      page: 1,
                      startDate: moment(e?.target?.value).format('YYYY-MM-DD HH:mm:ss').toString(),
                    })
                    setIsStartDateOpen(false)
                  }}
                />
              </div>

              <div className="text-paragraph regular-14 mt-4">To</div>

              <div ref={inputEndDateContainerRef}>
                <div className="text-paragraph regular-14 mb-1">End Date</div>
                <div
                  onKeyDown={() => {}}
                  onClick={() => {
                    setIsEndDateOpen(true)
                    inputEndDateRef?.current?.showPicker()
                  }}
                  className="transition-all duration-300 cursor-pointer search-input h-[38px] w-auto px-3 flex items-center justify-center space-x-3 border border-[#D5D5D5] rounded"
                >
                  <span
                    className={`text-paragraph regular-14 ${
                      params?.endDate ? 'text-[#0C0C0C]' : 'text-[#B1B1B1]'
                    } mr-2`}
                  >
                    {params?.endDate ? moment(params?.endDate).format('DD/MM/YYYY').toString() : 'DD/MM/YYYY'}
                  </span>
                  <IconChevronBottom
                    width={21}
                    height={21}
                    className={`${isEndDateOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}
                  ></IconChevronBottom>
                </div>
                <input
                  ref={inputEndDateRef}
                  className="h-0 w-0"
                  type="date"
                  onChange={e => {
                    setParams({
                      ...params,
                      page: 1,
                      endDate: moment(e?.target?.value).format('YYYY-MM-DD HH:mm:ss').toString(),
                    })
                    setIsEndDateOpen(false)
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setParams({ ...params, startDate: '', endDate: '' })
                }}
                className="-mt-1 border border-[#235696] rounded text-paragraph regular-14 text-[#235696] h-[38px] w-auto px-3"
              >
                Reset
              </button>
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
                      <th>Kode Booking</th>
                      <th>Nama</th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Lokasi</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Jenis Vehicle</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th className="text-center">Detail Unit</th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Brand</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Type</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Tahun</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th className="text-center">Tanggal Booking</th>
                      <th className="text-center">Tanggal Pengajuan</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-body text-paragraph regular-14">
                    {dummiesArray().map(val => (
                      <tr key={`calendar-${val}`} className="animate-pulse">
                        <td className="min-w-[80px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="min-w-[200px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[250px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[150px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[250px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[250px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[200px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[200px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[150px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[250px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[250px]">
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
                      <th>Kode Booking</th>
                      <th>Nama</th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Lokasi</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Jenis Vehicle</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th className="text-center">Detail Unit</th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Brand</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Type</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Tahun</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th className="text-center">Tanggal Booking</th>
                      <th className="text-center">Tanggal Pengajuan</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-body text-paragraph regular-14">
                    {data?.data?.map((bast: any, index, arr) => (
                      <tr
                        key={`bast-${bast?.noIdInfo}`}
                        className={`${index != arr.length - 1 ? 'border-b border-[#E6E5E6]' : ''}`}
                      >
                        <td className="min-w-[80px]">{bast?.id}</td>
                        <td className="min-w-[200px]">{bast?.code}</td>
                        <td className="min-w-[250px]">{bast?.name}</td>
                        <td className="text-center min-w-[150px]">{bast?.location}</td>
                        <td className="text-center min-w-[250px]">{bast?.vehicleType}</td>
                        <td className="text-center min-w-[250px]">{bast?.detailUnit}</td>
                        <td className="text-center min-w-[200px]">{bast?.brand}</td>
                        <td className="text-center min-w-[200px]">{bast?.type}</td>
                        <td className="text-center min-w-[150px]">{bast?.year}</td>
                        <td className="text-center min-w-[250px]">{bast?.bookingDate}</td>
                        <td className="text-center min-w-[250px]">{bast?.dtUpload}</td>

                        <td className="text-center min-w-[100px] w-full">
                          <div className="flex justify-center">
                            <button
                              type="button"
                              className="mr-3"
                              onClick={() => {
                                router.push(`/management/form-bast/${bast?.id}`)
                              }}
                            >
                              <IconEye width={20} height={20} className="hover:cursor-pointer mx-auto" />
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
                  setParams({ ...params, page: 1, size: 10, search: '' })
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
        </div>
      </div>
    </div>
  )
}
