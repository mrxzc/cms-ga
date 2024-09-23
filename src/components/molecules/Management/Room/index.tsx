'use client'

import Image from 'next/image'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import React, { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

// Import custom components and assets
import IconPlus from '@assets/icons/IconPlus'
import Table from '@components/atoms/Table'
import IconEditing from '@assets/icons/IconEditing'
import IconDownload from '@assets/icons/IconDownload'
import IconSearch from '@assets/icons/IconSearch'
import IconDeleting from '@assets/icons/IconDeleting'
import IconAlertDelete from '@assets/icons/IconAlertDelete'
import { useGetRoomList } from '@services/cms/room/query'
import { IRoomListParams } from '@interfaces/room'
import { Modal } from '@components/atoms/ModalCustom'
import { apiDeleteRoom } from '@services/cms/room/api'
import { toast } from 'react-toastify'
import { API_FILE_BARN } from '@utils/environment'

export function Management() {
  const router = useRouter()

  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roomIdToDelete, setRoomIdToDelete] = useState<string | null>(null)
  const [param, setParam] = useState<IRoomListParams>({
    search: searchQuery,
    page: 1,
    size: 10,
    sortField: 'kapasitas',
    sortDirection: 'ASC',
    kategoriMenu: 'Meeting Room',
  })

  // Fetch room list
  const { data: rooms, isLoading, isFetching, refetch } = useGetRoomList(param)

  // Transform room data for table display
  const transformedData = rooms?.data?.map((room, index) => ({
    ...room,
    originalIndex: index,
    ACTION: '',
  }))

  // Handle room status display
  const handleStatus = (status: string) => {
    const statusStyle =
      status === 'Active'
        ? 'bg-[#eaf5e9] text-[#457b3b] border border-[#afd5ab]'
        : 'bg-[#fcebee] text-[#b63831] border border-[#e39e9c]'
    return <div className={`${statusStyle} rounded`}>{status}</div>
  }

  // Modal management
  const handleCloseModal = () => setIsModalOpen(false)
  const handleBackdropClick = () => handleCloseModal()

  // Event handlers
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault()
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)
  const handlePageChange = (newPage: number) => setParam(prevParam => ({ ...prevParam, page: newPage }))

  // Room deletion logic
  const handleDeleteData = async (id: string | null) => {
    if (id) {
      try {
        const response = await apiDeleteRoom({ roomId: id })
        if (response.status === 'T') {
          toast.success('Ruangan berhasil dihapus!')
          refetch()
        } else {
          toast.error('Gagal menghapus ruangan.')
        }
      } catch (error) {
        toast.error('Gagal menghapus ruangan.')
      }
    }
    handleCloseModal()
  }

  // Breadcrumbs for navigation
  const breadcrumbs = [
    <Link
      underline="none"
      color="#000"
      href="/management/asset"
      onClick={handleClick}
      key="1"
      className="text-extra-small regular-12"
    >
      Booking Asset Data - Room Data
    </Link>,
  ]

  // Table column definitions
  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor('originalIndex', {
      cell: info => {
        const offset = ((rooms?.pagination?.currentPage ?? 1) - 1) * 10
        return offset + info.row.index + 1
      },
      header: 'No',
    }),
    columnHelper.accessor('pathImage', {
      cell: info => (
        <div className="flex items-center justify-center">
          <Image
            width={1400}
            height={800}
            src={`${API_FILE_BARN}${info.getValue()[0]}`}
            alt="Room Image"
            className="w-[140px] h-[80px] object-cover"
          />
        </div>
      ),
      header: 'Image',
    }),
    columnHelper.accessor('titleRoom', { cell: info => info.getValue(), header: 'Title Room' }),
    columnHelper.accessor('lokasi', { cell: info => info.getValue(), header: 'Lokasi' }),
    columnHelper.accessor('lantaiRuangan', { cell: info => `${info.getValue()}`, header: 'Lantai Ruangan' }),
    columnHelper.accessor('kapasitas', { cell: info => `${info.getValue()}`, header: 'Kapasitas Ruangan' }),
    columnHelper.accessor('status', { cell: info => handleStatus(info.getValue()), header: 'Status' }),
    columnHelper.accessor('ACTION', {
      cell: info => {
        const rowData = info.row.original
        return (
          <div className="flex gap-3 items-center justify-center">
            <button type="button" onClick={() => router.push(`/management/room/edit-room/${rowData.idRoom}`)}>
              <IconEditing width={20} height={20} className="hover:cursor-pointer" />
            </button>
            <button
              type="button"
              onClick={() => {
                setRoomIdToDelete(rowData.idRoom)
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

  // Update parameters when search query changes
  useEffect(() => {
    setParam(prevParam => ({
      ...prevParam,
      search: searchQuery,
      page: searchQuery ? 1 : prevParam.page,
    }))
  }, [searchQuery])

  return (
    <>
      <div className="px-4 py-8 bg-[#f6f6f6] h-screen w-full overflow-y-auto !important">
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
              onClick={() => router.push('/management/room/add-room')}
            >
              <IconPlus color="white" className="bg-[#505050] p-1 rounded-full" width={16} height={16} />
              Add New
            </button>
          </div>
        </div>

        <div className="bg-white px-4 py-4 rounded-xl">
          <p className="text-heading s semibold-18 mb-4">Room Data</p>
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
              TOTAL_DATA: rooms?.pagination?.totalRecords ?? 0,
              PAGE: rooms?.pagination?.currentPage ?? 1,
              LAST_PAGE: rooms?.pagination?.totalPage ?? 1,
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
              onClick={() => handleDeleteData(roomIdToDelete)}
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
