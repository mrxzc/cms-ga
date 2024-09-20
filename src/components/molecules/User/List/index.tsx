'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

import Table from '@components/atoms/Table'
import IconEditing from '@assets/icons/IconEditing'
import IconSearch from '@assets/icons/IconSearch'
import IconDeleting from '@assets/icons/IconDeleting'
import IconAlertDelete from '@assets/icons/IconAlertDelete'
import { IDefaultParams } from '@interfaces/api'
import { useGetUserManagementList } from '@services/account/query'
import { Modal } from '@components/atoms/ModalCustom'
import { apiDeleteUser } from '@services/account/api'

export function ListUser() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null)

  const defaultParams: IDefaultParams = {
    search: searchQuery,
    page: 1,
    size: 10,
  }

  const [params, setParams] = useState<IDefaultParams>(defaultParams)

  const { data: userList, isLoading, isFetching, refetch } = useGetUserManagementList(params)

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
      cell: info => {
        const rowData = info.row.original

        const handleEditClick = () => {
          router.push(`/user-management/${rowData.idUser}`)
        }

        const handleDeleteClick = () => {
          setUserIdToDelete(rowData.idUser)
          setIsModalOpen(true)
        }

        return (
          <div className="flex gap-3 items-center justify-center">
            <button type="button" onClick={handleEditClick}>
              <IconEditing width={20} height={20} className="hover:cursor-pointer" />
            </button>
            <button type="button" onClick={handleDeleteClick}>
              <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handlePageChange = (newPage: number) => {
    setParams(prevParam => ({ ...prevParam, page: newPage }))
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleBackdropClick = () => {
    handleCloseModal()
  }

  const handleDeleteData = async (id: string | null) => {
    if (id) {
      try {
        const response = await apiDeleteUser(id)
        if (response.status === 'T') {
          toast.success('User berhasil dihapus!')
          refetch()
        } else {
          toast.error('Gagal menghapus User.')
        }
      } catch (error) {
        toast.error('Gagal menghapus User.')
      }
    }

    handleCloseModal()
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

  useEffect(() => {
    refetch()
  }, [params])

  return (
    <>
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

      <Modal isOpen={isModalOpen} backdropDismiss backdropClick={handleBackdropClick} isFloating={true}>
        <div className="p-4 bg-white rounded relative flex flex-col items-center">
          <IconAlertDelete />
          <h2 className="text-heading m semibold-21 mb-2">Hapus Data</h2>
          <p className="text-paragraph regular-14 text-[#717171] mb-4">Apakah anda yakin ingin menghapus data ini?</p>
          <div className="flex justify-center gap-4 items-end">
            <button
              className="bg-white border-[#ea394b] border text-[#ea394b] w-full min-w-[180px] max-h-[45px] px-12 py-3 rounded-md text-heading xs semibold-16"
              type="button"
              onClick={handleCloseModal}
            >
              Batal
            </button>
            <button
              className="bg-[#ea394b] text-white w-full min-w-[180px] max-h-[45px] px-12 py-3 rounded-md text-heading xs semibold-16"
              type="button"
              onClick={() => handleDeleteData(userIdToDelete)}
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
