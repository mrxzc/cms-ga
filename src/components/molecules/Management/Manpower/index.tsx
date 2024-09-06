'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import React, { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

import IconPlus from '@assets/icons/IconPlus'
import Table from '@components/atoms/Table'
import IconEye from '@assets/icons/IconEye'
import IconSearch from '@assets/icons/IconSearch'
import IconDownload from '@assets/icons/IconDownload'
import DateRangeInput from '@components/atoms/DateRangeInput'
import { data } from './data'

export function Manpower() {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

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
    columnHelper.accessor('kodeBooking', {
      cell: info => info.getValue(),
      header: 'Kode Booking',
    }),
    columnHelper.accessor('nama', {
      cell: info => info.getValue(),
      header: 'Nama',
    }),
    columnHelper.accessor('lokasi', {
      cell: info => `${info.getValue()}`,
      header: 'Lokasi',
    }),
    columnHelper.accessor('manpower', {
      cell: info => `${info.getValue()}`,
      header: 'Manpower',
    }),
    columnHelper.accessor('gender', {
      cell: info => `${info.getValue()}`,
      header: 'Gender',
    }),
    columnHelper.accessor('kebutuhanManpower', {
      cell: info => `${info.getValue()}`,
      header: 'Kebutuhan Manpower',
    }),
    columnHelper.accessor('waktuBooking', {
      cell: info => `${info.getValue()}`,
      header: 'Waktu Booking',
    }),
    columnHelper.accessor('tanggalBooking', {
      cell: info => `${info.getValue()}`,
      header: 'Tanggal Booking',
    }),
    columnHelper.accessor('tanggalPengajuan', {
      cell: info => `${info.getValue()}`,
      header: 'Tanggal Pengajuan',
    }),
    columnHelper.accessor('status', {
      cell: info => handleStatus(info.getValue()),
      header: 'Status', // Sesuai
    }),
    columnHelper.accessor('ACTION', {
      cell: () => (
        <div className="flex gap-3 items-center justify-center">
          <IconEye width={20} height={20} className="hover:cursor-pointer" />
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
      color="#000"
      href="/management/vehicle"
      onClick={handleClick}
      key="1"
      className="text-extra-small regular-12"
    >
      Booking Asset Data - Manpower Data
    </Link>,
  ]

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  useEffect(() => {
    setTotalPages(10)
  }, [])

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
        </div>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Manpower Data</p>
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
          <button
            className="next-button flex rounded-md justify-center items-center w-[100px] text-white"
            onClick={() => router.push('/management/manpower/add-manpower')}
          >
            <div className="bg-white w-[16px] h-[16px] rounded-full items-center justify-center flex mr-1">
              <IconPlus width={12} height={12} color="#1e5597" />
            </div>
            Add New
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <DateRangeInput
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>

        <Table
          columns={columns}
          data={data}
          loading={false}
          pagination={{
            TOTAL_DATA: data.length,
            PAGE: currentPage,
            LAST_PAGE: totalPages,
          }}
          callback={handlePageChange}
        />
      </div>
    </div>
  )
}
