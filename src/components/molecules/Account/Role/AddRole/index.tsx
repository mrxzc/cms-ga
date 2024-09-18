'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

import TextForm from '@components/atoms/Form/TextForm'
import AccessTable from '@components/atoms/AccessTable'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = Yup.object().shape({
  roleName: Yup.string().required('Nama Role wajib dipilih'),
  roleDescription: Yup.string().required('Nama Role wajib dipilih'),
  isActive: Yup.string().required('Aktif wajib dipilih'),
})

export function AddRole() {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)

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
      Account Management - Role Management
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Add Role Management
    </Typography>,
  ]

  useEffect(() => {
    setValue('isActive', isChecked ? 'Active' : 'Non-Active')
  }, [isChecked])

  const [accessData, setAccessData] = useState([
    { menu: 'Dashboard', create: false, update: false, delete: false, view: false, all: false },
    { menu: 'Booking Asset Data', create: false, update: false, delete: false, view: false, all: false },
    { menu: 'Building Management', create: false, update: false, delete: false, view: false, all: false },
    { menu: 'Monitoring Pesanan', create: false, update: false, delete: false, view: false, all: false },
    { menu: 'Calendar of Event', create: false, update: false, delete: false, view: false, all: false },
    { menu: 'Master Data', create: false, update: false, delete: false, view: false, all: false },
    { menu: 'Account Management', create: false, update: false, delete: false, view: false, all: false },
  ])

  const handleAccessChange = (updatedAccessData: any) => {
    setAccessData(updatedAccessData)
  }

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
        <p className="text-heading s semibold-18 mb-4">Add Role Management</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-paragraph regular-14 w-[160px]">
              Name Role<span className="text-red-500">*</span>
            </p>
            <TextForm
              control={control}
              name="roleName"
              fieldInput={{ placeholder: 'Masukkan nama role' }}
              className="w-[350px]"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-paragraph regular-14 w-[160px]">
              Description Role<span className="text-red-500">*</span>
            </p>
            <TextForm
              control={control}
              name="roleDescription"
              fieldInput={{ placeholder: 'Masukkan deskripsi role' }}
              className="w-[350px]"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-paragraph regular-14 w-[160px]">Status</p>
            <div className="flex flex-row gap-2 items-center">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle toggle-accent"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  value={''}
                />
              </label>
              {isChecked ? (
                <p className="text-paragraph regular-14">Aktif</p>
              ) : (
                <p className="text-paragraph regular-14">Tidak Aktif</p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-paragraph regular-14 w-[160px]">Akses</p>
            <AccessTable accessState={accessData} onAccessChange={handleAccessChange} />
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
