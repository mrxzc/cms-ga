'use client'

import IconChevronBottom from '@assets/icons/IconChevronBottom'
import IconDownload from '@assets/icons/IconDownload'
import IconEye from '@assets/icons/IconEye'
import IconFilter from '@assets/icons/IconFilter'
import IconSearch from '@assets/icons/IconSearch'
import Pagination from '@components/atoms/Pagination'
import { debounce } from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { data } from './data'

export function List() {
  const router = useRouter()

  // const dataUser: IOTPLoginResponse = GetCookie('data_user')

  const inputStartDateRef = useRef<any>(null)
  const inputEndDateRef = useRef<any>(null)
  const inputStartDateContainerRef = useRef<HTMLDivElement>(null)
  const inputEndDateContainerRef = useRef<HTMLDivElement>(null)

  const [isStartDateOpen, setIsStartDateOpen] = useState<boolean>(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState<boolean>(false)

  const [keywords, setKeywords] = useState<string>()

  const defaultParams: any = {
    startDate: '',
    endDate: '',
    search: '',
    page: 1,
    size: 10,
  }
  const [params, setParams] = useState<any>(defaultParams)

  // const { data, isFetching, refetch } = useGetListBast(params, dataUser?.idUser)

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
          <div className="text-extra-small regular-12">Building Management - Report Kondisi Cabang</div>
          <div className="flex">
            <button type="button" className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]">
              <IconDownload className="-mt-0.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <div className="text-heading s semibold-18 mb-6">Report Kondisi Cabang</div>

          {/* Table controller */}
          <div className="mb-4">
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
          {/* {!isFetching && (
            <div className="relative mb-6">
              <div className="rounded-lg border border-[#E6E5E6] overflow-auto">
                <table className="table-fixed custom-table">
                  <thead className="table-head text-heading xs semibold-16">
                    <tr>
                      <th>No</th>
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
                          <span>Title Room</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Lantai Ruangan</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th className="text-center">Kapasitas Ruangan</th>
                      <th className="text-center">Tanggal Pengajuan</th>
                      <th className="text-center">Tanggal Booking</th>
                      <th className="text-center">Waktu Booking</th>
                      <th>
                        <div className="text-center flex items-center justify-center space-x-2">
                          <span>Status</span>
                          <button type="button">
                            <IconFilter></IconFilter>
                          </button>
                        </div>
                      </th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-body text-paragraph regular-14">
                    {dummiesArray().map(val => (
                      <tr key={`monitoring-${val}`} className="animate-pulse">
                        <td className="min-w-[80px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="min-w-[200px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[150px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[150px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[200px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[200px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[250px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[250px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[250px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="text-center min-w-[150px]">
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
          )} */}

          {/* {!isFetching && data?.data?.length ? ( */}
          <div className="relative mb-6">
            <div className="rounded-lg border border-[#E6E5E6] overflow-auto">
              <table className="table-fixed custom-table">
                <thead className="table-head text-heading xs semibold-16">
                  <tr>
                    <th>No</th>
                    <th>
                      <div className="flex items-center space-x-2">
                        <span>Area</span>
                        <button type="button">
                          <IconFilter></IconFilter>
                        </button>
                      </div>
                    </th>
                    <th>
                      <div className="text-center flex items-center justify-center space-x-2">
                        <span>Cabang</span>
                        <button type="button">
                          <IconFilter></IconFilter>
                        </button>
                      </div>
                    </th>
                    <th className="text-center">Tanggal Pengajuan</th>
                    <th className="text-center">Waktu Booking</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="table-body text-paragraph regular-14"></tbody>
                <tbody className="table-body text-paragraph regular-14">
                  {data?.map((val: any, index, arr) => (
                    <tr
                      key={`val-${val?.no}`}
                      className={`${index != arr.length - 1 ? 'border-b border-[#E6E5E6]' : ''}`}
                    >
                      <td className="min-w-[80px]">{val?.no}</td>
                      <td className="min-w-[100px]">{val?.area}</td>
                      <td className="text-center min-w-[250px]">{val?.branch}</td>
                      <td className="text-center min-w-[250px]">{val?.dtUpload}</td>
                      <td className="text-center min-w-[150px]">{val?.bookingTime}</td>
                      <td className="text-center min-w-[100px] w-full">
                        <div className="flex justify-center">
                          <button
                            type="button"
                            className="mr-3"
                            onClick={() => {
                              router.push(`/building-management/building-maintenance/branch-condition/${val?.no}`)
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
          {/* ) : null} */}

          {/* {!isFetching && !data?.data?.length ? (
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
          ) : null}  */}
          {/* Table */}

          {/* Pagination */}
          <Pagination
            isLoading={false}
            pagination={{ currentPage: 1, totalPage: 10, totalRecords: 100, nextPage: null, prevPage: null }}
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
