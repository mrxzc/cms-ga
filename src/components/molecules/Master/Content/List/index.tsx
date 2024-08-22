'use client'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { createColumnHelper } from '@tanstack/react-table'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import IconChevronBottom from '@assets/icons/IconChevronBottom'
import IconEditing from '@assets/icons/IconEditing'
import IconPencil from '@assets/icons/IconPencil'
import IconTrash from '@assets/icons/IconTrash'
import images from '@assets/images'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import IconCloudUpload from '@assets/icons/IconCloudUpload'

export function List() {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // const handleStatus = (status: boolean) => {
  //   if (status) {
  //     return <div className="bg-[#eaf5e9] text-[#457b3b] border border-[#afd5ab] rounded">Active</div>
  //   } else if (status === false) {
  //     return <div className="bg-[#fcebee] text-[#b63831] border border-[#e39e9c] rounded">Non-Active</div>
  //   } else {
  //     return '-'
  //   }
  // }

  const fileInput = useRef<HTMLInputElement>(null)

  const array = new Uint32Array(1)
  const fileInputKey = useRef<string>(crypto.getRandomValues(array).toString())

  const { handleSubmit, setValue, control } = useForm<{ fileForm: File | undefined }>({
    defaultValues: {},
  })

  const fileForm = useWatch({
    control,
    name: 'fileForm',
  })

  const onSubmit = async () => {
    router.push('/booking-asset/vehicle/special-operational/process')
  }

  const onFileClicked = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('id', {
      cell: info => info.getValue(),
      header: 'No',
    }),
    columnHelper.accessor('title', {
      cell: info => info.getValue(),
      header: 'Title',
    }),
    columnHelper.accessor('tanggalUpload', {
      cell: info => info.getValue(),
      header: 'Tanggal Upload',
    }),
    // columnHelper.accessor('status', {
    //   cell: info => (
    //     <div className="flex items-center justify-center">
    //       {/* Hello */}
    //       {/* <Image
    //       width={1400}
    //       height={800}
    //       src={info.getValue()}
    //       alt="Room Image"
    //       className="w-[140px] h-[80px] object-cover"
    //     /> */}
    //     </div>
    //   ),
    //   header: 'Status',
    // }),
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

  const breadcrumbs = [
    <Link
      underline="none"
      color="#235696"
      href="/management/asset"
      onClick={handleClick}
      key="1"
      className="text-heading m semibold-21"
    >
      Master Data - Manage Konten
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
        <p className="text-heading s semibold-18 mb-4">Master Data Konten</p>
        <div className="flex justify-between mb-4">
          {/* <IconChevronBottom></IconChevronBottom> */}
          {/* <SelectInput
            name="location"
            options={options}
            value={selectedOption}
            onChange={handleChange}
            placeholder="Semua Konten"
            className="w-[150px]"
          /> */}
          {/* <button
            className="next-button flex rounded-md justify-center items-center w-[100px] text-white"
            onClick={() => router.push('/management/asset/add-asset')}
          >
            <div className="bg-white w-[16px] h-[16px] rounded-full items-center justify-center flex mr-1">
              <IconPlus width={12} height={12} color="#1e5597" />
            </div>
            Add New
          </button> */}
        </div>

        <div className="flex items-center">
          <p className="text-heading xs regular-16 w-[160px]">
            About Us<span className="text-red-500">*</span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="text-paragraph regular-14 mb-3">
              Untuk peminjaman kendaraan diwajibkan untuk melampirkan form dan sudah di tanda tangani.
            </div>
            <Link
              href={'https://pii.or.id/uploads/dummies.pdf'}
              target="_blank"
              className="border border-[#0072BB] bg-[#E9F9FE] text-paragraph regular-14 flex items-center px-4 py-3 w-full justify-center space-x-2 rounded mb-3"
            >

              <span className="text-[#626262]">
                Klik <span className="text-paragraph semibold-14 text-[#0089CF]">disini</span> untuk mengunduh file
              </span>
            </Link> */}

            <input
              key={fileInputKey.current}
              ref={fileInput}
              id="fileInput"
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={e => {
                if (e?.target.files?.length) {
                  setValue('fileForm', e?.target?.files[0])
                  fileInputKey.current = crypto.getRandomValues(array).toString()
                }
              }}
            />

            {!fileForm && (
              <button
                type="button"
                onClick={onFileClicked}
                className="border border-[#0072BB] border-dashed text-paragraph regular-14 flex items-center px-4 py-3 w-full justify-center space-x-2 rounded"
              >
                <IconCloudUpload></IconCloudUpload>

                <span className="text-[#626262]">
                  Klik <span className="text-paragraph semibold-14 text-[#0089CF]">disini</span> untuk pilih file
                </span>
              </button>
            )}

            {fileForm && (
              <div className="border border-[#0072BB] border-dashed text-paragraph regular-14 flex items-center px-4 py-3 w-full space-x-2 rounded">
                <span className="flex-1 truncate w-40">{fileForm?.name}</span>

                <button
                  type="button"
                  onClick={onFileClicked}
                  className="border border-[#0072BB] flex items-center justify-center rounded w-7 h-7"
                >
                  <IconPencil></IconPencil>
                </button>
                <button
                  type="button"
                  onClick={() => setValue('fileForm', undefined)}
                  className="border border-[#FF4040] flex items-center justify-center rounded w-7 h-7"
                >
                  <IconTrash></IconTrash>
                </button>
              </div>
            )}

            {/* <button
              disabled={!fileForm}
              type="submit"
              className={`${
                !fileForm ? 'bg-[#B1B1B1]' : 'submit-button'
              } h-11 w-full text-[#ffffff] py-2.5 text-paragraph semibold-14 rounded-lg`}
            >
              Submit File
            </button> */}
          </form>
          {/* <SelectForm
              control={control}
              name="location"
              placeholder="Pilih Konten asset"
              options={options}
              setValue={setValue}
              className="w-[350px]"
            /> */}
        </div>

        {/* <Table
          columns={columns}
          data={data}
          loading={false}
          pagination={{
            TOTAL_DATA: 100,
            PAGE: currentPage,
            LAST_PAGE: totalPages,
          }}
          callback={handlePageChange}
        /> */}
      </div>
    </div>
  )
}
