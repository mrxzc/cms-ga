'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createColumnHelper } from '@tanstack/react-table'

import Table from '@components/atoms/Table'
import IconEye from '@assets/icons/IconEye'
import IconSearch from '@assets/icons/IconSearch'
import IconDownload from '@assets/icons/IconDownload'
import DateRangeInput from '@components/atoms/DateRangeInput'
import { data } from './data'

export function MonitoringCleaningService() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const handleStatus = (status: string) => {
    if (status === 'Done') {
      return <div className="bg-[#eaf5e9] text-[#457b3b] border border-[#afd5ab] rounded">Selesai</div>
    }
    if (status === 'Waiting') {
      return <div className="bg-[#FDF4E2] text-[#F19D38] border border-[#F19D38] rounded">Menunggu Approval</div>
    } else {
      return <div className="bg-[#fcebee] text-[#b63831] border border-[#e39e9c] rounded">Tidak Berhasil</div>
    }
  }

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('no', {
      cell: info => info.getValue(),
      header: 'No',
    }),
    columnHelper.accessor('nama', {
      cell: info => info.getValue(),
      header: 'Nama',
    }),
    columnHelper.accessor('lokasi', {
      cell: info => info.getValue(),
      header: 'Lokasi',
    }),
    columnHelper.accessor('area', {
      cell: info => `${info.getValue()}`,
      header: 'Area',
    }),
    columnHelper.accessor('cabang', {
      cell: info => `${info.getValue()}`,
      header: 'Cabang',
    }),
    columnHelper.accessor('kategoriPengajuan', {
      cell: info => `${info.getValue()}`,
      header: 'Kategori Pengajuan',
    }),
    columnHelper.accessor('tanggalPengajuan', {
      cell: info => `${info.getValue()}`,
      header: 'Tanggal Pengajuan',
    }),
    columnHelper.accessor('status', {
      cell: info => handleStatus(info.getValue()),
      header: 'Status',
    }),
    columnHelper.accessor('ACTION', {
      cell: info => {
        const rowData = info.row.original

        const handleViewDetailClick = () => {
          router.push(`/monitoring/management/cleaning-service/${rowData.no}`)
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
      href="/monitoring/management/cleaning-service"
      onClick={handleClick}
      key="1"
      className="text-extra-small regular-12"
    >
      Monitoring Pesanan - Cleaning Service
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
        <p className="text-heading s semibold-18 mb-4">Monitoring Pesanan - Cleaning Service</p>
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
