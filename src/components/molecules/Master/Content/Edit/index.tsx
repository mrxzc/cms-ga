'use client'

import IconCloudUpload from '@assets/icons/IconCloudUpload'
import IconPencil from '@assets/icons/IconPencil'
import IconTrash from '@assets/icons/IconTrash'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'

export function Edit() {
  const router = useRouter()

  const fileInput = useRef<HTMLInputElement>(null)

  const array = new Uint32Array(1)
  const fileInputKey = useRef<string>(crypto.getRandomValues(array).toString())

  const { handleSubmit, setValue, control } = useForm<any>({
    defaultValues: {},
  })

  const fileForm = useWatch({
    control,
    name: 'fileForm',
  })

  const onFileClicked = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const breadcrumbs = [
    <Link href="/master/content" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      Master Data - Manage Konten
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Edit Konten
    </Typography>,
  ]

  const onSubmit = () => {}

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-screen w-full overflow-y-auto">
      <div className="bg-white px-4 py-4 rounded-xl mb-4 flex gap-2 items-center ">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Edit Konten</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Kebersihan <span className="text-red-500">*</span>
            </p>
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

            <div>
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
            </div>

            {/* <button
              disabled={!fileForm}
              type="submit"
              className={`${
                !fileForm ? 'bg-[#B1B1B1]' : 'submit-button'
              } h-11 w-full text-[#ffffff] py-2.5 text-paragraph semibold-14 rounded-lg`}
            >
              Submit File
            </button> */}
          </div>
          <br />
          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Kerapihan <span className="text-red-500">*</span>
            </p>
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

            <div>
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
            </div>

            {/* <button
              disabled={!fileForm}
              type="submit"
              className={`${
                !fileForm ? 'bg-[#B1B1B1]' : 'submit-button'
              } h-11 w-full text-[#ffffff] py-2.5 text-paragraph semibold-14 rounded-lg`}
            >
              Submit File
            </button> */}
          </div>

          <div className="divider" />

          <div className="flex justify-end gap-2 items-end">
            <button
              className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
              type="button"
              onClick={() => router.push('/master/content')}
            >
              Cancel
            </button>
            <button
              className="bg-[#235696] text-[#e5f2fc] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
