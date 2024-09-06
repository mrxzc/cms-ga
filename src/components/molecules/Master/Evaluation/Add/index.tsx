'use client'

import TextAreaForm from '@components/atoms/Form/TextAreaForm'
import { yupResolver } from '@hookform/resolvers/yup'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  title: Yup.string().required('Judul wajib diisi'),
})

export function Add() {
  const router = useRouter()

  const { handleSubmit, control } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const breadcrumbs = [
    <Link href="/master/location" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      Master Data - Manage Penilaian
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Add Penilaian
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
        <p className="text-heading s semibold-18 mb-4">Add Penilaian</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Title <span className="text-red-500">*</span>
            </p>
            <TextAreaForm
              control={control}
              name="title"
              fieldLabel={{ children: 'Title' }}
              fieldInput={{ rows: 1 }}
              counter
              className="w-[350px]"
            />
          </div>

          <div className="divider" />

          <div className="flex justify-end gap-2 items-end">
            <button
              className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
              type="button"
              onClick={() => router.push('/master/location')}
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
