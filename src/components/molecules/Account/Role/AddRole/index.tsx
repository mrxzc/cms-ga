'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import * as Yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import TextForm from '@components/atoms/Form/TextForm'
import AccessTable from '@components/atoms/AccessTable'

const schema = Yup.object().shape({
  isActive: Yup.string().required('Aktif wajib dipilih'),
  manpowerAsset: Yup.string().required('Manpower asset wajib dipilih'),
})

export function AddRole() {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)

  const { handleSubmit, control, setValue } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const breadcrumbs = [
    <Link href="/account-management/role" key="1" className="text-heading m semibold-21 text-[#235696] hover:underline">
      Account Management - Role Management
    </Link>,
    <Typography key="2" color="text.primary" className="text-heading m semibold-21">
      Add Role Management
    </Typography>,
  ]

  useEffect(() => {
    setValue('isActive', isChecked ? 'Active' : 'Non-Active')
  }, [isChecked])

  const [accessData, setAccessData] = useState([
    { menu: 'Dashboard', create: true, update: true, delete: true, view: false, all: true },
    { menu: 'Booking Asset Data', create: true, update: true, delete: true, view: true, all: true },
    { menu: 'Building Management', create: true, update: true, delete: true, view: true, all: false },
    { menu: 'Monitoring Pesanan', create: false, update: true, delete: true, view: true, all: true },
    { menu: 'Calendar of Event', create: true, update: false, delete: true, view: true, all: true },
    { menu: 'Master Data', create: true, update: true, delete: true, view: false, all: true },
    { menu: 'Account Management', create: true, update: true, delete: true, view: true, all: true },
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
              name="manpowerAsset"
              fieldInput={{ placeholder: 'Masukkan nama role' }}
              className="w-[350px]"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-paragraph regular-14 w-[160px]">Status</p>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                value={''}
              />
            </label>
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
