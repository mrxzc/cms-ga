'use client'

import IconChevronBottom from '@assets/icons/IconChevronBottom'
import IconClose from '@assets/icons/IconClose'
import IconDownload from '@assets/icons/IconDownload'
import IconEye from '@assets/icons/IconEye'
import IconFilter from '@assets/icons/IconFilter'
import IconSearch from '@assets/icons/IconSearch'
import Pagination from '@components/atoms/Pagination'
import TableFilterDropdown from '@components/atoms/TableFilterDropdown'
import { ISearchParams } from '@interfaces/api'
import { EnumClass } from '@interfaces/enums'
import { IMonitoringAssetList } from '@interfaces/monitoringAsset'
import { useGetListAsset, useGetListAssetMonitoringStatus } from '@services/monitoring/asset/query'
import { dummiesArray } from '@utils/common'
import { reduceParamsFunc } from '@utils/helper/ParamsReducer'
import { debounce } from 'lodash'
import moment from 'moment'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

export function List() {
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = useSearchParams()

  const filters = searchParams.get('filters')

  const inputStartDateRef = useRef<any>(null)
  const inputEndDateRef = useRef<any>(null)
  const inputStartDateContainerRef = useRef<HTMLDivElement>(null)
  const inputEndDateContainerRef = useRef<HTMLDivElement>(null)
  const statusFilterContainerRef = useRef<HTMLTableCellElement>(null)

  const [isStartDateOpen, setIsStartDateOpen] = useState<boolean>(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState<boolean>(false)

  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState<boolean>(false)

  const handleMappingInitial = () => {
    try {
      const tempQuery = JSON.parse(filters ?? '')
      return tempQuery
    } catch (error) {
      return {
        startDate: '',
        endDate: '',
        search: '',
        status: '',
        page: 1,
      }
    }
  }

  const [keywords, setKeywords] = useState<string>(handleMappingInitial()?.search)

  // Fetch List Asset
  const [params, setParams] = useState<any>(handleMappingInitial())
  const handleMappingParams = () => {
    const resParams = params
    return reduceParamsFunc({
      ...resParams,
      status: resParams?.status?.length ? resParams?.status?.map((val: any) => val.id)?.join(',') : '',
      size: 10,
    })
  }
  const { data, isFetching } = useGetListAsset(handleMappingParams())
  // Fetch List Asset

  // Fetch List Status
  const [statusParams, setStatusParams] = useState<ISearchParams>({ search: '' })
  const [statusSelected, setStatusSelected] = useState<EnumClass<any>[]>(handleMappingInitial()?.status ?? [])
  const { data: status, isFetching: isStatusFetching } = useGetListAssetMonitoringStatus(statusParams)
  // Fetch List Status

  // Provide a debounce to prevent triggering functions based on duration
  const handleSearch = useCallback(
    debounce(input => {
      setParams((prev: any) => {
        return { ...prev, page: 1, search: input }
      })
    }, 500),
    []
  )

  const handleSearchStatus = useCallback(
    debounce(input => {
      setStatusParams({ search: input })
    }, 500),
    []
  )
  // Provide a debounce to prevent triggering functions based on duration

  // Effect for container when click outside
  useEffect(() => {
    const handleClick = (event: any) => {
      if (!inputStartDateContainerRef?.current?.contains(event?.target)) {
        setIsStartDateOpen(false)
      }

      if (!inputEndDateContainerRef?.current?.contains(event?.target)) {
        setIsEndDateOpen(false)
      }

      if (!statusFilterContainerRef?.current?.contains(event?.target)) {
        setIsStatusFilterOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isStartDateOpen, isEndDateOpen, isStatusFilterOpen])
  // Effect for container when click outside

  // Effect for status filter table when filter has changed
  useEffect(() => {
    setParams({
      ...params,
      status: statusSelected?.length ? statusSelected : '',
    })
  }, [statusSelected])
  // Effect for status filter table when filter has changed

  // Effect for replace url when params has changed
  useEffect(() => {
    const reduce = reduceParamsFunc(params)
    const stringfy = JSON.stringify(reduce)
    router.replace(pathname + '?filters=' + stringfy)
  }, [params])
  // Effect for replace url when params has changed\

  // Effect for set new params base on query params url
  useEffect(() => {
    if (filters) {
      try {
        const tempQuery = JSON.parse(filters ?? '')
        setParams({ ...tempQuery })
        setKeywords(tempQuery?.search)
        setStatusSelected(tempQuery?.status?.length ? tempQuery?.status : [])
      } catch (error) {
        throw new Error('Cannot get query params')
      }
    }
  }, [])
  // Effect for set new params base on query params url

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8">
        <div className="bg-white px-6 py-3 rounded mb-4 flex justify-between overflow-scroll">
          <div className="text-extra-small regular-12">Monitoring Pesanan - Asset</div>
          <div className="flex">
            <button type="button" className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]">
              <IconDownload className="-mt-0.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <div className="text-heading s semibold-18 mb-6">Monitoring Pesanan - Asset</div>

          {/* Table controller */}
          <div className="mb-2">
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
                  max={params?.endDate}
                  onChange={e => {
                    setParams({
                      ...params,
                      page: 1,
                      startDate: moment(e?.target?.value).format('YYYY-MM-DD').toString(),
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
                  min={params?.startDate}
                  onChange={e => {
                    setParams({
                      ...params,
                      page: 1,
                      endDate: moment(e?.target?.value).format('YYYY-MM-DD').toString(),
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

          {/* Tag filter */}
          {params?.status?.length ? (
            <div className="mb-6 relative">
              <div className="mb-1">Filtered value : </div>
              <div className="inline-block  overflow-auto w-full">
                {params?.status?.length > 0 &&
                  params?.status?.map((val: any) => (
                    <button
                      key={val?.id}
                      type="button"
                      onClick={() => {
                        setStatusSelected(prev => {
                          if (prev?.find(finded => finded['id'] == val['id'])) {
                            return prev?.filter(filtered => filtered['id'] !== val['id'])
                          }

                          return prev
                        })
                      }}
                      className="border border-[#235696] text-[#235696] w-auto mr-2 rounded-lg px-3 py-0.5"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>{val?.text}</span>
                        <IconClose color="#235696"></IconClose>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ) : null}
          {/* Tag filter */}

          {/* Table */}
          <div className="relative mb-6">
            <div className="rounded-lg border border-[#E6E5E6] min-h-60 overflow-auto">
              <table className="table-fixed custom-table">
                <thead className="table-head text-heading xs semibold-16">
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th className="text-center">Total Asset</th>
                    <th className="text-center">Tanggal Booking</th>
                    <th className="text-center">Waktu Booking</th>
                    <th className="text-center">Tanggal Pengajuan</th>
                    <th ref={statusFilterContainerRef} className="relative z-1">
                      <div className="text-center flex items-center justify-center space-x-2">
                        <span>Status</span>
                        <button
                          onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
                          type="button"
                          disabled={isFetching}
                        >
                          <IconFilter color={statusSelected?.length ? '#2196f3' : '#A9A9A9'}></IconFilter>
                        </button>
                      </div>
                      <TableFilterDropdown
                        filterKey={'status-filter'}
                        classContainer={`z-[999] absolute top-10 right-0 bg-white rounded-lg shadow-md max-h-44 min-w-64 border border-[#E6E5E6] overflow-y-auto`}
                        isLoading={isStatusFetching}
                        isOpen={isStatusFilterOpen}
                        filterable={true}
                        placeholder="Cari Status"
                        data={status}
                        value={statusSelected}
                        labelField="text"
                        valueField="id"
                        onValueSelected={selected => {
                          setStatusSelected(prev => {
                            if (prev?.find(finded => finded['id'] == selected['id'])) {
                              return prev?.filter(filtered => filtered['id'] !== selected['id'])
                            }
                            return prev?.length
                              ? [...prev, { id: selected['id'], text: selected['text'] }]
                              : [{ id: selected['id'], text: selected['text'] }]
                          })
                        }}
                        onFilterChanged={search => {
                          handleSearchStatus(search)
                        }}
                        onClosed={() => {
                          if (!isStatusFetching) {
                            setStatusParams({ search: '' })
                          }
                        }}
                      />
                    </th>

                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="table-body text-paragraph regular-14">
                  {isFetching &&
                    dummiesArray()?.map(val => (
                      <tr key={`monitoring-${val}`} className={`animated-pulse border-b border-[#E6E5E6]`}>
                        <td className="min-w-[80px]">
                          <div className="w-full h-6 bg-gray-200"></div>
                        </td>
                        <td className="min-w-[200px]">
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
                  {!isFetching && data?.data?.length ? (
                    data?.data?.map((val: IMonitoringAssetList) => (
                      <tr key={`val-${val?.idBooking}`} className={`border-b border-[#E6E5E6]`}>
                        <td className="min-w-[80px]">{val?.idBooking}</td>
                        <td className="min-w-[200px]">{val?.nama}</td>
                        <td className="text-center min-w-[150px]">{val?.totalAsset}</td>
                        <td className="text-center min-w-[250px]">{val?.tanggalBooking}</td>
                        <td className="text-center min-w-[250px]">{val?.waktuBooking}</td>
                        <td className="text-center min-w-[250px]">{val?.tanggalPengajuan}</td>
                        <td className="text-center min-w-[150px]">
                          <span className="text-error">No Data</span>
                          {/* <div className={`rounded ${val.} bg-[#D3FED7] text-[#4EC558] text-paragraph semibold-14 px-2 py-1`}>
                            Dummy
                          </div> */}
                        </td>

                        <td className="text-right min-w-[100px] w-full">
                          <div className="flex justify-end mr-3">
                            <button
                              type="button"
                              className="mr-3"
                              onClick={() => {
                                router.push(`/monitoring/asset/${val?.idBooking}`)
                              }}
                            >
                              <IconEye width={20} height={20} className="hover:cursor-pointer mx-auto" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="relative w-full h-48 min-w-[1430px] justify-center"></td>
                    </tr>
                  )}
                </tbody>
              </table>

              {!isFetching && !data?.data?.length ? (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-heading s semibold-18 mb-2">Tidak ada data</div>
                    <div className="text-extra-small regular-12 mb-1">Saat ini belum ada yang tersedia.</div>
                    <div className="text-extra-small regular-12 mb-4">Silahkan ubah atau reset filter.</div>
                    <button
                      onClick={() => {
                        setKeywords('')
                        setParams({ ...params, page: 1, search: '' })
                      }}
                      type="button"
                      className="next-button h-8 px-4 rounded-lg w-auto text-extra-small semibold-12 text-[#FFFFFF] flex items-center justify-center"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

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
