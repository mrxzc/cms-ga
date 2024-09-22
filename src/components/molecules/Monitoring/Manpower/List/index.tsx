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
import { IOTPLoginResponse } from '@interfaces/auth'
import { IGcmLocationListParams } from '@interfaces/gcmLocation'
import { IMonitoringManpowerList } from '@interfaces/monitoringManpower'
import { useGetLocation } from '@services/gcm/location/query'
import { useGetListManpower, useGetListManpowerCategory } from '@services/monitoring/manpower/query'
import { useGetListMeetingRoomMonitoringStatus } from '@services/monitoring/meetingRoom/query'
import { GetCookie } from '@store/storage'
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

  const dataUser: IOTPLoginResponse = GetCookie('data_user')

  // const statusEnums = new MeetingRoomMonitoringStatusClassEnum()

  const inputStartDateRef = useRef<any>(null)
  const inputEndDateRef = useRef<any>(null)
  const inputStartDateContainerRef = useRef<HTMLDivElement>(null)
  const inputEndDateContainerRef = useRef<HTMLDivElement>(null)

  const statusFilterContainerRef = useRef<HTMLTableCellElement>(null)
  const locationFilterContainerRef = useRef<HTMLTableCellElement>(null)
  const categoryFilterContainerRef = useRef<HTMLTableCellElement>(null)

  const [isStartDateOpen, setIsStartDateOpen] = useState<boolean>(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState<boolean>(false)

  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState<boolean>(false)
  const [isLocationFilterOpen, setIsLocationFilterOpen] = useState<boolean>(false)
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState<boolean>(false)

  const handleMappingInitial = () => {
    try {
      const tempQuery = JSON.parse(filters ?? '')
      return tempQuery
    } catch (error) {
      return {
        location: '',
        kategori: '',
        status: '',
        startDate: '',
        endDate: '',
        search: '',
        page: 1,
      }
    }
  }

  const [keywords, setKeywords] = useState<string>(handleMappingInitial()?.search)

  // Fetch List Manpower
  const [params, setParams] = useState<any>(handleMappingInitial())
  const handleMappingParams = () => {
    const resParams = params
    return reduceParamsFunc({
      ...resParams,
      status: resParams?.status?.length ? resParams?.status?.map((val: any) => val.id)?.join(',') : '',
      kategori: resParams?.kategori?.length ? resParams?.kategori?.map((val: any) => val?.text)?.join(',') : '',
      location: resParams?.location?.length ? resParams?.location?.map((val: any) => val?.descGcm)?.join(',') : '',
      size: 10,
    })
  }
  const { data, isFetching } = useGetListManpower(handleMappingParams())
  // Fetch List Manpower

  // Fetch List Status
  const [statusParams, setStatusParams] = useState<ISearchParams>({ search: '' })
  const [statusSelected, setStatusSelected] = useState<any[]>(handleMappingInitial()?.status ?? [])
  const { data: status, isFetching: isStatusFetching } = useGetListMeetingRoomMonitoringStatus(statusParams)
  // Fetch List Status

  // Fetch List Location
  const [locationsParams, setLocationsParams] = useState<IGcmLocationListParams>({ search: '', page: 1, size: 5 })
  const [locationsSelected, setLocationsSelected] = useState<any[]>(handleMappingInitial()?.location ?? [])
  const { data: locations, isFetching: isLocationsFetching } = useGetLocation(locationsParams, dataUser?.idUser)
  // Fetch List Location

  // Fetch List Category
  const [categoryParams, setCategoryParams] = useState<ISearchParams>({ search: '' })
  const [categorySelected, setCategorySelected] = useState<any[]>(handleMappingInitial()?.kategori ?? [])
  const { data: category, isFetching: isCategoryFetching } = useGetListManpowerCategory(categoryParams)
  // Fetch List Category

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

  const handleSearchLocations = useCallback(
    debounce(input => {
      setLocationsParams({ search: input, page: 1, size: 5 })
    }, 500),
    []
  )

  const handleSearchCategory = useCallback(
    debounce(input => {
      setCategoryParams({ search: input })
    }, 500),
    []
  )
  // Provide a debounce to prevent triggering functions based on duration

  // Effect for status filter table when filter has changed
  useEffect(() => {
    setParams({
      ...params,
      status: statusSelected?.length ? statusSelected : '',
    })
  }, [statusSelected])

  useEffect(() => {
    setParams({
      ...params,
      location: locationsSelected?.length ? locationsSelected : '',
    })
  }, [locationsSelected])

  useEffect(() => {
    setParams({
      ...params,
      kategori: categorySelected?.length ? categorySelected : '',
    })
  }, [categorySelected])
  // Effect for status filter table when filter has changed

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

      if (!locationFilterContainerRef?.current?.contains(event?.target)) {
        setIsLocationFilterOpen(false)
      }

      if (!categoryFilterContainerRef?.current?.contains(event?.target)) {
        setIsCategoryFilterOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isStartDateOpen, isEndDateOpen, isStatusFilterOpen, isLocationFilterOpen, isCategoryFilterOpen])
  // Effect for container when click outside

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
        setLocationsSelected(tempQuery?.location?.length > 0 ? tempQuery?.location : [])
        setCategorySelected(tempQuery?.kategori?.length ? tempQuery?.kategori : [])
      } catch (error) {
        throw new Error('Cannot get query params')
      }
    }
  }, [])
  // Effect for set new params base on query params url

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8">
        <div className="bg-white px-6 py-3 rounded mb-4 flex justify-between">
          <div className="text-extra-small regular-12">Monitoring Pesanan - Manpower</div>
          <div className="flex">
            <button type="button" className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]">
              <IconDownload className="-mt-0.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <div className="text-heading s semibold-18 mb-6">Monitoring Pesanan - Manpower</div>

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

          {/* Tag filter */}
          {params?.status?.length > 0 || params?.location?.length > 0 || params?.kategori?.length > 0 ? (
            <div className="mb-6 relative">
              <div className="mb-1">Filtered value : </div>
              <div className="inline-block overflow-auto w-full">
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
                      className="border border-[#235696] text-[#235696] w-auto mr-2 mb-2 rounded-lg px-3 py-0.5"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>{val?.text}</span>
                        <IconClose color="#235696"></IconClose>
                      </div>
                    </button>
                  ))}
                {params?.location?.length > 0 &&
                  params?.location?.map((val: any) => (
                    <button
                      key={val?.noSr}
                      type="button"
                      onClick={() => {
                        setLocationsSelected(prev => {
                          if (prev?.find(finded => finded['noSr'] == val['noSr'])) {
                            return prev?.filter(filtered => filtered['noSr'] !== val['noSr'])
                          }

                          return prev
                        })
                      }}
                      className="border border-[#235696] text-[#235696] w-auto mr-2 mb-2 rounded-lg px-3 py-0.5"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>{val?.descGcm}</span>
                        <IconClose color="#235696"></IconClose>
                      </div>
                    </button>
                  ))}
                {params?.kategori?.length > 0 &&
                  params?.kategori?.map((val: any) => (
                    <button
                      key={val?.id}
                      type="button"
                      onClick={() => {
                        setCategorySelected(prev => {
                          if (prev?.find((finded: any) => finded['id'] == val['id'])) {
                            return prev?.filter((filtered: any) => filtered['id'] !== val['id'])
                          }

                          return prev
                        })
                      }}
                      className="border border-[#235696] text-[#235696] w-auto mr-2 mb-2 rounded-lg px-3 py-0.5"
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
                    <th ref={locationFilterContainerRef} className="relative z-1">
                      <div className="text-center flex items-center justify-center space-x-2">
                        <span>Lokasi</span>
                        <button
                          onClick={() => setIsLocationFilterOpen(!isLocationFilterOpen)}
                          type="button"
                          disabled={isFetching || isLocationsFetching}
                        >
                          <IconFilter color={locationsSelected?.length ? '#2196f3' : '#A9A9A9'}></IconFilter>
                        </button>
                      </div>
                      <TableFilterDropdown
                        filterKey={'location-filter'}
                        classContainer={`z-[999] absolute top-10 right-0 bg-white rounded-lg shadow-md max-h-44 min-w-64 border border-[#E6E5E6] overflow-y-auto`}
                        isLoading={isLocationsFetching}
                        isOpen={isLocationFilterOpen}
                        filterable={true}
                        placeholder="Cari Lokasi"
                        data={locations?.data}
                        value={locationsSelected}
                        labelField="descGcm"
                        valueField="noSr"
                        onValueSelected={selected => {
                          setLocationsSelected(prev => {
                            if (prev?.find(finded => finded['noSr'] == selected['noSr'])) {
                              return prev?.filter(filtered => filtered['noSr'] !== selected['noSr'])
                            }
                            return prev?.length
                              ? [...prev, { noSr: selected['noSr'], descGcm: selected['descGcm'] }]
                              : [{ noSr: selected['noSr'], descGcm: selected['descGcm'] }]
                          })
                        }}
                        onFilterChanged={search => {
                          handleSearchLocations(search)
                        }}
                        onClosed={() => {
                          if (!isLocationsFetching) {
                            setLocationsParams({ ...locationsParams, search: '' })
                          }
                        }}
                      />
                    </th>
                    <th ref={categoryFilterContainerRef} className="relative z-1">
                      <div className="text-center flex items-center justify-center space-x-2">
                        <span>Kategori</span>
                        <button
                          onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
                          type="button"
                          disabled={isFetching || isCategoryFetching}
                        >
                          <IconFilter color={categorySelected?.length ? '#2196f3' : '#A9A9A9'}></IconFilter>
                        </button>
                      </div>
                      <TableFilterDropdown
                        filterKey={'room-floor-filter'}
                        classContainer={`z-[999] absolute top-10 right-0 bg-white rounded-lg shadow-md max-h-44 min-w-64 border border-[#E6E5E6] overflow-y-auto`}
                        isLoading={isCategoryFetching}
                        isOpen={isCategoryFilterOpen}
                        filterable={true}
                        placeholder="Cari Kategori"
                        data={category}
                        value={categorySelected}
                        labelField="text"
                        valueField="id"
                        onValueSelected={selected => {
                          setCategorySelected(prev => {
                            if (prev?.find(finded => finded['id'] == selected['id'])) {
                              return prev?.filter(filtered => filtered['id'] !== selected['id'])
                            }
                            return prev?.length
                              ? [...prev, { id: selected['id'], text: selected['text'] }]
                              : [{ id: selected['id'], text: selected['text'] }]
                          })
                        }}
                        onFilterChanged={search => {
                          handleSearchCategory(search)
                        }}
                        onClosed={() => {
                          if (!isCategoryFetching) {
                            setCategoryParams({ search: '' })
                          }
                        }}
                      />
                    </th>
                    <th className="text-center">Request Manpower</th>
                    <th className="text-center">Tanggal Pengajuan</th>
                    <th className="text-center">Tanggal Booking</th>
                    <th className="text-center">Waktu Booking</th>
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
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="table-body text-paragraph regular-14">
                  {isFetching &&
                    dummiesArray().map(val => (
                      <tr key={`monitoring-${val}`} className="animate-pulse border-b border-[#E6E5E6]">
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

                  {!isFetching && data?.data?.length ? (
                    data?.data?.map((val: IMonitoringManpowerList) => (
                      <tr key={`val-${val?.idBooking}`} className={`border-b border-[#E6E5E6]`}>
                        <td className="min-w-[80px]">{val?.idBooking}</td>
                        <td className="min-w-[200px]">{val?.nama}</td>
                        <td className="text-center min-w-[150px]">{val?.lokasi}</td>
                        <td className="text-center min-w-[150px]">{val?.kategori}</td>
                        <td className="text-center min-w-[200px]">{val?.requestManpower}</td>
                        <td className="text-center min-w-[250px]">{val?.tanggalPengajuan}</td>
                        <td className="text-center min-w-[250px]">{val?.tanggalBooking}</td>
                        <td className="text-center min-w-[250px]">{val?.waktuBooking}</td>
                        <td className="text-center min-w-[150px]">
                          <div className="text-error">No Data</div>
                        </td>

                        <td className="text-center min-w-[100px] w-full">
                          <div className="flex justify-end mr-3">
                            <button
                              type="button"
                              className="mr-3"
                              onClick={() => {
                                router.push(`/monitoring/manpower/${val?.idBooking}`)
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
                      <td colSpan={10} className="relative w-full h-48 min-w-[1980px] justify-center"></td>
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
