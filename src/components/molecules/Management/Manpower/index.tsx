'use client';

import React, { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import SelectInput from '@components/atoms/Form/Select';
import IconPlus from '@assets/icons/IconPlus';
import Table from '@components/atoms/Table';
import { data } from './data';
import IconEye from '@assets/icons/IconEye';

export function Manpower() {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (newValue: any) => {
    setSelectedOption(newValue);
  };

  const options = [
    { value: 'berijalan', label: 'Berijalan' },
    { value: 'acc', label: 'ACC' },
  ];

  const handleStatus = (status: string) => {
    if (status === "Active") {
      return <div className="bg-[#eaf5e9] text-[#457b3b] border border-[#afd5ab] rounded">Active</div>;
    } else { // Menangani semua kasus selain "Active"
      return <div className="bg-[#fcebee] text-[#b63831] border border-[#e39e9c] rounded">Non-Active</div>;
    }
  };

  const columnHelper = createColumnHelper<any>();

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
  ];

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
  };

  const breadcrumbs = [
    <Link
      underline="none"
      color="#235696"
      href="/management/vehicle"
      onClick={handleClick}
      key="1"
      className="text-heading m semibold-21"
    >
      Booking Asset Data - Manpower Data
    </Link>,
  ];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setTotalPages(10);
  }, []);

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-full w-full">
      <div className="bg-white px-4 py-4 rounded-xl mb-4 text-[#235696]">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Manpower Data</p>
        <div className="flex justify-between mb-4">
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
            onClick={() => router.push('/management/manpower/add-manpower')}
          >
            <div className="bg-white w-[16px] h-[16px] rounded-full items-center justify-center flex mr-1">
              <IconPlus width={12} height={12} color="#1e5597" />
            </div>
            Add New
          </button>
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
  );
}
