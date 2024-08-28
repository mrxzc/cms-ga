'use client'

import Image from 'next/image'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import React, { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

import IconPlus from '@assets/icons/IconPlus'
import Table from '@components/atoms/Table'
import IconEditing from '@assets/icons/IconEditing'
import images from '@assets/images'
import IconSearch from '@assets/icons/IconSearch'
import IconDownload from '@assets/icons/IconDownload'
import { useGetRoomList } from '@services/cms/room/query'
import { IRoomListParams } from '@interfaces/room'

export function ManagementPods() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')

  const [param, setParam] = useState<IRoomListParams>({
    search: searchQuery,
    page: 1,
    size: 10,
    sortField: 'kapasitas',
    sortDirection: 'ASC',
    kategoriMenu: 'Pods',
  })

  const { data: pods, isLoading, isFetching } = useGetRoomList(param)

  const handleStatus = (status: string) => {
    if (status === 'Active') {
      return <div className="bg-[#eaf5e9] text-[#457b3b] border border-[#afd5ab] rounded">Active</div>
    } else {
      return <div className="bg-[#fcebee] text-[#b63831] border border-[#e39e9c] rounded">Non-Active</div>
    }
  }

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('originalIndex', {
      cell: info => info.getValue() + 1,
      header: 'No',
    }),
    columnHelper.accessor('pathImage[0]', {
      cell: info => (
        <div className="flex items-center justify-center">
          <Image
            width={1400}
            height={800}
            src={info.getValue()}
            alt="Room Image"
            className="w-[140px] h-[80px] object-cover"
          />
        </div>
      ),
      header: 'Image',
    }),
    columnHelper.accessor('titleRoom', {
      cell: info => info.getValue(),
      header: 'Title Room',
    }),
    columnHelper.accessor('lokasi', {
      cell: info => info.getValue(),
      header: 'Lokasi',
    }),
    columnHelper.accessor('lantaiRuangan', {
      cell: info => `${info.getValue()}`,
      header: 'Lantai Ruangan',
    }),
    columnHelper.accessor('kapasitas', {
      cell: info => `${info.getValue()}`,
      header: 'Kapasitas Ruangan',
    }),
    columnHelper.accessor('status', {
      cell: info => handleStatus(info.getValue()),
      header: 'Status',
    }),
    columnHelper.accessor('ACTION', {
      cell: () => (
        <div className="flex gap-3 items-center justify-center">
          <IconEditing width={20} height={20} className="hover:cursor-pointer" />
          <Image src={images.DELETE_ICON} width={20} height={20} alt="Delete Icon" className="hover:cursor-pointer" />
        </div>
      ),
      header: 'Action',
    }),
  ]

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
  }

  const breadcrumbs = [
    <Link
      underline="none"
      color="#235696"
      href="/management/pods"
      onClick={handleClick}
      key="1"
      className="text-heading m semibold-21"
    >
      Booking Asset Data - Pods Data
    </Link>,
  ]

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    // Perbarui 'param' saat 'searchQuery' berubah
    setParam((prevParam: any) => ({
      ...prevParam,
      search: searchQuery,
      page: searchQuery ? 1 : prevParam.page,
    }))
  }, [searchQuery])

  const transformedData = pods?.data?.map((pod, index) => ({
    ...pod,
    originalIndex: index,
    ACTION: '',
  }))

  const handlePageChange = (newPage: number) => {
    // Update your state or logic to fetch data for the new page
    setParam(prevParam => ({ ...prevParam, page: newPage }))
  }

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-full w-full overflow-auto">
      <div className="bg-white px-4 py-4 rounded-xl mb-4 text-[#235696] flex justify-between">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <div className="flex">
          <button type="button" className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]">
            <IconDownload />
            Download
          </button>
          <div className="divider lg:divider-horizontal" />
          <button
            type="button"
            className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]"
            onClick={() => router.push('/management/pods/add-pods')}
          >
            <IconPlus color="white" className="bg-[#505050] p-1 rounded-full" width={16} height={16} />
            Add New
          </button>
        </div>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Pods Data</p>
        <div className="flex justify-between mb-4">
          <div className="search-input h-[38px] px-3 flex items-center justify-center space-x-3 border rounded-lg min-w-[400px]">
            <IconSearch color="#909090" />

            <input
              type="text"
              placeholder="Search..."
              className="flex-1 text-paragraph regular-14 mt-1"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                outline: 'none',
              }}
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={transformedData}
          loading={isLoading || isFetching}
          pagination={{
            TOTAL_DATA: pods?.pagination?.totalRecords ?? 0,
            PAGE: pods?.pagination?.currentPage ?? 1,
            LAST_PAGE: pods?.pagination?.totalPage ?? 1,
          }}
          callback={handlePageChange}
        />
      </div>
    </div>
  )
}
