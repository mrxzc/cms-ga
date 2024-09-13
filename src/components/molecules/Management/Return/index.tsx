'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import React, { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

import Table from '@components/atoms/Table'
import IconSearch from '@assets/icons/IconSearch'
import IconEye from '@assets/icons/IconEye'
import TabNavigation, { Tab } from '@components/atoms/TabNavigation'
import { data } from './data'

export function Return() {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const transformedData = data?.approval?.map((request, index) => ({
    ...request,
    originalIndex: index,
    ACTION: '',
  }))

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('originalIndex', {
      cell: info => info.getValue() + 1,
      header: 'No',
    }),
    columnHelper.accessor('bookingCode', {
      cell: info => info.getValue(),
      header: 'Kode Booking',
    }),
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
      header: 'Nama',
    }),
    columnHelper.accessor('product', {
      cell: info => info.getValue(),
      header: 'Produk',
    }),
    columnHelper.accessor('submissionDate', {
      cell: info => info.getValue(),
      header: 'Tanggal Pengajuan',
    }),
    columnHelper.accessor('bookingDate', {
      cell: info => info.getValue(),
      header: 'Tanggal Booking',
    }),
    columnHelper.accessor('ACTION', {
      cell: info => {
        const rowData = info.row.original

        const handleViewDetailClick = () => {
          router.push(`/management/approval-bucket/${rowData.originalIndex + 1}`)
        }

        return (
          <div className="flex gap-3 items-center justify-center">
            <button type="button" onClick={handleViewDetailClick}>
              <IconEye width={20} height={20} className="hover:cursor-pointer" />
            </button>
          </div>
        )
      },
      header: 'Action',
    }),
  ]

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
  }

  const breadcrumbs = [
    <Link
      underline="none"
      color="black"
      href="/management/approval-bucket"
      onClick={handleClick}
      key="1"
      className="text-extra-small regular-12"
    >
      Booking Asset Data - Pengembalian Barang
    </Link>,
  ]

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  useEffect(() => {
    setTotalPages(10)
  }, [])

  const [activeTab, setActiveTab] = useState('allProduct')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const tabs: Tab[] = [
    { label: 'All Product', value: 'allProduct' },
    { label: 'Asset', value: 'asset' },
  ]

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-full w-full overflow-auto">
      <div className="bg-white px-4 py-4 rounded-xl mb-4 text-[#235696] flex justify-between">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Pengembalian Barang</p>
        <div className="mb-4">
          <TabNavigation tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
        </div>
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
          data={transformedData}
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
