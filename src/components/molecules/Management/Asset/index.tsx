'use client'

import React, { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { data } from './data'
import IconPlus from '@assets/icons/IconPlus'
import Table from '@components/atoms/Table'
import IconEditing from '@assets/icons/IconEditing'
import images from '@assets/images'
import IconDownload from '@assets/icons/IconDownload'
import IconSearch from '@assets/icons/IconSearch'

export function Management() {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleStatus = (status: string) => {
    if (status === 'Active') {
      return <div className="bg-[#eaf5e9] text-[#457b3b] border border-[#afd5ab] rounded">Active</div>
    } else {
      return <div className="bg-[#fcebee] text-[#b63831] border border-[#e39e9c] rounded">Non-Active</div>
    }
  }

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('no', {
      cell: info => info.getValue(),
      header: 'No',
    }),
    columnHelper.accessor('asset_name', {
      cell: info => info.getValue(),
      header: 'Nama Asset',
    }),
    columnHelper.accessor('location', {
      cell: info => info.getValue(),
      header: 'Lokasi',
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
      href="/management/asset"
      onClick={handleClick}
      key="1"
      className="text-heading m semibold-21"
    >
      Booking Asset Data - Asset Data
    </Link>,
  ]

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  useEffect(() => {
    setTotalPages(10)
  }, [])

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-full w-full">
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
            onClick={() => router.push('/management/asset/add-asset')}
          >
            <IconPlus color="white" className="bg-[#505050] p-1 rounded-full" width={16} height={16} />
            Add New
          </button>
        </div>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Asset Data</p>
        <div className="flex justify-between mb-4">
          <div className="search-input h-[38px] px-3 flex items-center justify-center space-x-3 border rounded-lg min-w-[400px]">
            <IconSearch color="#909090" />

            <input
              type="text"
              placeholder="Search..."
              className="flex-1 text-paragraph regular-14 mt-1"
              value={''}
              onChange={() => {}}
              style={{
                outline: 'none',
              }}
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={data}
          loading={false}
          pagination={{
            TOTAL_DATA: 100,
            PAGE: currentPage,
            LAST_PAGE: totalPages,
          }}
          callback={handlePageChange}
        />
      </div>
    </div>
  )
}
