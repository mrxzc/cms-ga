'use client'

// Import necessary libraries and components
import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { toast } from 'react-toastify'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

// Import custom components and services
import Table from '@components/atoms/Table'
import { Modal } from '@components/atoms/ModalCustom'
import IconEditing from '@assets/icons/IconEditing'
import IconSearch from '@assets/icons/IconSearch'
import IconDeleting from '@assets/icons/IconDeleting'
import IconAlertDelete from '@assets/icons/IconAlertDelete'
import { apiDeleteUser } from '@services/account/api'
import { useGetRoleList, useGetUserManagementList } from '@services/account/query'
import { useUpdateUserMutation } from '@services/user/mutation'
import { IDefaultParams } from '@interfaces/api'
import { IUpdateUserPayload } from '@interfaces/user-management'

export function ListUser() {
  // Router and state management
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null)

  // Default parameters for API requests
  const defaultParams: IDefaultParams = {
    search: searchQuery,
    page: 1,
    size: 10,
  }

  const paramRoles: IDefaultParams = {
    search: '',
    page: 1,
    size: 50,
  }

  const [params, setParams] = useState<IDefaultParams>(defaultParams)
  const [paramRole] = useState<IDefaultParams>(paramRoles)

  // Fetch user and role data
  const { data: userList, isLoading, isFetching, refetch } = useGetUserManagementList(params)
  const { data: roleList } = useGetRoleList(paramRole)

  // Mutation for updating user
  const updateUserMutation = useUpdateUserMutation()

  // Transform user data for the table
  const transformedData = userList?.data?.map((user, index) => ({
    ...user,
    originalIndex: index,
    ACTION: '',
  }))

  // Column helper for table
  const columnHelper = createColumnHelper<any>()

  // Define table columns
  const columns = [
    columnHelper.accessor('originalIndex', {
      cell: info => {
        const offset = ((userList?.pagination?.currentPage ?? 1) - 1) * 10
        return offset + info.row.index + 1
      },
      header: 'No',
    }),
    columnHelper.accessor('nameUser', { cell: info => info.getValue(), header: 'Nama' }),
    columnHelper.accessor('npk', { cell: info => info.getValue() ?? '-', header: 'NPK' }),
    columnHelper.accessor('email', { cell: info => info.getValue(), header: 'Email' }),
    columnHelper.accessor('noHp', { cell: info => info.getValue(), header: 'No Telepon' }),
    columnHelper.accessor('roleName', { cell: info => info.getValue() ?? '-', header: 'Role' }),
    columnHelper.accessor('flagActive', {
      cell: info => {
        const rowData = info.row.original
        const roleId = roleList?.data?.find(role => role.roleName === rowData.roleName)?.noId ?? 0
        return <div>{handleStatus(rowData.idUser, roleId, info.getValue())}</div>
      },
      header: 'Status',
    }),
    columnHelper.accessor('ACTION', {
      cell: info => {
        const rowData = info.row.original
        return (
          <div className="flex gap-3 items-center justify-center">
            <button type="button" onClick={() => router.push(`/user-management/${rowData.idUser}`)}>
              <IconEditing width={20} height={20} className="hover:cursor-pointer" />
            </button>
            <button
              type="button"
              onClick={() => {
                setUserIdToDelete(rowData.idUser)
                setIsModalOpen(true)
              }}
            >
              <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
            </button>
          </div>
        )
      },
      header: 'Action',
    }),
  ]

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  // Handle pagination changes
  const handlePageChange = (newPage: number) => {
    setParams(prevParam => ({ ...prevParam, page: newPage }))
  }

  // Handle modal close
  const handleCloseModal = () => setIsModalOpen(false)

  // Handle user deletion
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
      } catch {
        toast.error('Gagal menghapus User.')
      }
    }
    handleCloseModal()
  }

  // Handle user status change
  const handleStatusChange = async (userId: string, roleId: number, currentStatus: boolean) => {
    const newStatus = !currentStatus
    const data: IUpdateUserPayload = {
      idUser: userId,
      roleId: roleId.toString(),
      flagActive: newStatus,
    }

    try {
      const response = await updateUserMutation.mutateAsync(data)
      if (response.status === 'T') {
        toast.success('Status pengguna berhasil diperbarui!')
        refetch()
      } else {
        toast.error(response.message || 'Gagal memperbarui status pengguna.')
      }
    } catch {
      toast.error('Terjadi kesalahan saat memperbarui status pengguna.')
    }
  }

  // Generate status toggle
  const handleStatus = (userId: string, roleId: number, status: boolean) => (
    <label className="switch">
      <input
        name={`status-${userId}`}
        type="checkbox"
        defaultChecked={status}
        onChange={() => handleStatusChange(userId, roleId, status)}
      />
      <span className="slider green round" />
    </label>
  )

  // Breadcrumbs for navigation
  const breadcrumbs = [
    <Link
      underline="none"
      color="black"
      href="/management/asset"
      onClick={event => event.preventDefault()}
      key="1"
      className="text-extra-small regular-12"
    >
      User Management - List User
    </Link>,
  ]

  // Update search parameters based on user input
  useEffect(() => {
    setParams(prevParam => ({
      ...prevParam,
      search: searchQuery,
      page: searchQuery ? 1 : prevParam.page,
    }))
  }, [searchQuery])

  // Refetch user data when parameters change
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
                style={{ outline: 'none' }}
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

      <Modal isOpen={isModalOpen} backdropDismiss backdropClick={handleCloseModal} isFloating={true}>
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
