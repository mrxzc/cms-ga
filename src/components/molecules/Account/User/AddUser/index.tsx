'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import TextForm from '@components/atoms/Form/TextForm'
import SelectForm from '@components/atoms/Form/SelectForm'
import { optionsRole } from './data'

const schema = Yup.object().shape({
  isActive: Yup.string().required('Aktif wajib dipilih'),
  manpowerAsset: Yup.string().required('Manpower asset wajib dipilih'),
})

export function AddUser() {
  const router = useRouter()

  const { handleSubmit, control, setValue } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const breadcrumbs = [
    <Link
      href="/account-management/role"
      key="1"
      className="text-extra-small regular-12 text-[#235696] hover:underline"
    >
      Account Management - User Management
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Add User Management
    </Typography>,
  ]

  const onSubmit = () => {
    /* ... Your submission logic ... */
  }

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
        <p className="text-heading s semibold-18 mb-4">Add User Management</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">
              Email<span className="text-red-500">*</span>
            </p>
            <TextForm
              control={control}
              name="email"
              fieldInput={{ placeholder: 'Masukkan nama user' }}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">
              Role<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="role"
              placeholder="Pilih role user"
              options={optionsRole}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="divider" />

          <div className="flex justify-end gap-2 items-end">
            <button
              className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
              type="button"
              onClick={() => router.push('/account-management/role')}
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
