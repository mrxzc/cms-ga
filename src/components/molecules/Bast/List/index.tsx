'use client'

import IconPlus from '@assets/icons/IconPlus'
import DateRangeInput from '@components/atoms/DateRangeInput'
import Table from '@components/atoms/Table'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { data } from './data'

export function List() {
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
    columnHelper.accessor('id', {
      cell: info => info.getValue(),
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
    columnHelper.accessor('location', {
      cell: info => `${info.getValue()}`,
      header: 'Lokasi',
    }),
    columnHelper.accessor('vehicleType', {
      cell: info => `${info.getValue()}`,
      header: 'Jenis Vehicle',
    }),
    columnHelper.accessor('detail', {
      cell: info => `${info.getValue()}`,
      header: 'Detail Unit',
    }),
    columnHelper.accessor('brand', {
      cell: info => `${info.getValue()}`,
      header: 'Brand',
    }),
    columnHelper.accessor('type', {
      cell: info => `${info.getValue()}`,
      header: 'Type',
    }),
    columnHelper.accessor('year', {
      cell: info => `${info.getValue()}`,
      header: 'Tahun',
    }),
    columnHelper.accessor('bookingDate', {
      cell: info => `${info.getValue()}`,
      header: 'Tanggal Booking',
    }),
    columnHelper.accessor('submissionDate', {
      cell: info => handleStatus(info.getValue()),
      header: 'Tanggal Pengajuan',
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
      Manage Bast
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
      <div className="bg-white px-4 py-4 rounded-xl mb-4 text-[#235696]">
        {/* <p className="text-heading m semibold-21 ">Booking Asset Data - Room</p> */}
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Bast</p>
        {/* <div className="flex justify-between mb-4">
          <SelectInput
            name="location"
            options={options}
            value={selectedOption}
            onChange={handleChange}
            placeholder="Semua Lokasi"
            className="w-[150px]"
          />
          <button
            className="next-button flex rounded-md justify-center items-center w-[100px] text-white"
            onClick={() => router.push('/management/asset/add-asset')}
          >
            <div className="bg-white w-[16px] h-[16px] rounded-full items-center justify-center flex mr-1">
              <IconPlus width={12} height={12} color="#1e5597" />
            </div>
            Add New
          </button>
        </div> */}

        <div className="flex justify-between mb-4">
          <DateRangeInput
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          <button
            type="button"
            className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]"
            onClick={() => router.push('/bast/add')}
          >
            <IconPlus color="white" className="bg-[#505050] p-1 rounded-full" width={16} height={16} />
            Add New
          </button>
        </div>

        <div className="overflow-x-auto w-screen">
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
    </div>
  )
}
