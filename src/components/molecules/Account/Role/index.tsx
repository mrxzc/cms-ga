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
import IconDownload from '@assets/icons/IconDownload'
import IconSearch from '@assets/icons/IconSearch'
import { IDefaultParams } from '@interfaces/api'
import { useGetRoleList } from '@services/account/query'

export function Role() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')

  const defaultParams: IDefaultParams = {
    search: searchQuery,
    page: 1,
    size: 10,
  }

  const [params, setParams] = useState<IDefaultParams>(defaultParams)

  const { data: roleList, isLoading, isFetching } = useGetRoleList(params)

  const transformedData = roleList?.data?.map((role, index) => ({
    ...role,
    originalIndex: index,
    ACTION: '',
  }))

  const handleStatus = (status: boolean) => {
    if (status) {
      return (
        <label className="switch">
          <input name={`status-${status}`} defaultChecked={status} type="checkbox" />
          <span className="slider green round" />
        </label>
      )
    } else {
      return (
        <label className="switch">
          <input name={`status-${status}`} type="checkbox" />
          <span className="slider green round" />
        </label>
      )
    }
  }

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('originalIndex', {
      cell: info => {
        const offset = ((roleList?.pagination?.currentPage ?? 1) - 1) * 10
        return offset + info.row.index + 1
      },
      header: 'No',
    }),
    columnHelper.accessor('roleName', {
      cell: info => info.getValue(),
      header: 'Nama Role',
    }),
    columnHelper.accessor('description', {
      cell: info => info.getValue() ?? '-',
      header: 'Description',
    }),
    columnHelper.accessor('createdAt', {
      cell: info => info.getValue(),
      header: 'Tanggal Terbuat',
    }),
    columnHelper.accessor('flagActive', {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handlePageChange = (newPage: number) => {
    setParams(prevParam => ({ ...prevParam, page: newPage }))
  }

  const breadcrumbs = [
    <Link
      underline="none"
      color="black"
      href="/account-management/role"
      onClick={handleClick}
      key="1"
      className="text-extra-small regular-12"
    >
      Account Management - Role Management
    </Link>,
  ]

  useEffect(() => {
    setParams(prevParam => ({
      ...prevParam,
      search: searchQuery,
      page: searchQuery ? 1 : prevParam.page,
    }))
  }, [searchQuery])

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
            onClick={() => router.push('/account-management/role/add-role')}
          >
            <IconPlus color="white" className="bg-[#505050] p-1 rounded-full" width={16} height={16} />
            Add New
          </button>
        </div>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Role Management</p>
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
            TOTAL_DATA: roleList?.pagination?.totalRecords ?? 0,
            PAGE: roleList?.pagination?.currentPage ?? 1,
            LAST_PAGE: roleList?.pagination?.totalPage ?? 1,
          }}
          callback={handlePageChange}
        />
      </div>
    </div>
  )
}
