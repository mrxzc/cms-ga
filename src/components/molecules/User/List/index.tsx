'use client'

import Image from 'next/image'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import React, { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import Table from '@components/atoms/Table'
import IconEditing from '@assets/icons/IconEditing'
import images from '@assets/images'
import IconSearch from '@assets/icons/IconSearch'
import { IDefaultParams } from '@interfaces/api'
import { useGetUserManagementList } from '@services/account/query'

export function ListUser() {
  const [searchQuery, setSearchQuery] = useState('')

  const defaultParams: IDefaultParams = {
    search: searchQuery,
    page: 1,
    size: 10,
  }

  const [params, setParams] = useState<IDefaultParams>(defaultParams)

  const { data: userList, isLoading, isFetching } = useGetUserManagementList(params)

  const transformedData = userList?.data?.map((user, index) => ({
    ...user,
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
        const offset = ((userList?.pagination?.currentPage ?? 1) - 1) * 10
        return offset + info.row.index + 1
      },
      header: 'No',
    }),
    columnHelper.accessor('nameUser', {
      cell: info => info.getValue(),
      header: 'Nama',
    }),
    columnHelper.accessor('npk', {
      cell: info => info.getValue() ?? '-',
      header: 'NPK',
    }),
    columnHelper.accessor('email', {
      cell: info => info.getValue(),
      header: 'Email',
    }),
    columnHelper.accessor('noHp', {
      cell: info => info.getValue(),
      header: 'No Telepon',
    }),
    columnHelper.accessor('roleName', {
      cell: info => info.getValue() ?? '-',
      header: 'Role',
    }),
    columnHelper.accessor('flagActive', {
      cell: info => handleStatus(info.getValue()),
      header: 'Status',
    }),
    columnHelper.accessor('ACTION', {
      cell: () => (
        <div className="flex gap-3 items-center justify-center">
          <button>
            <IconEditing width={20} height={20} />
          </button>
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
      href="/management/asset"
      onClick={handleClick}
      key="1"
      className="text-extra-small regular-12"
    >
      User Management - List User
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
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">List User</p>
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
            TOTAL_DATA: userList?.pagination?.totalRecords ?? 0,
            PAGE: userList?.pagination?.currentPage ?? 1,
            LAST_PAGE: userList?.pagination?.totalPage ?? 1,
          }}
          callback={handlePageChange}
        />
      </div>
    </div>
  )
}
