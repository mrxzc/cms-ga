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

const schema = Yup.object().shape({
  isActive: Yup.string().required('Aktif wajib dipilih'),
  manpowerAsset: Yup.string().required('Manpower asset wajib dipilih'),
})

export function AddManpower() {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)

  const { handleSubmit, control, setValue } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const breadcrumbs = [
    <Link href="/management/manpower" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      Booking Asset Data - Manpower Data
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Add Manpower Data
    </Typography>,
  ]

  useEffect(() => {
    setValue('isActive', isChecked ? 'Active' : 'Non-Active')
  }, [isChecked])

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
        <p className="text-heading s semibold-18 mb-4">Add Manpower Data</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Aktif</p>
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

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Manpower Asset<span className="text-red-500">*</span>
            </p>
            <TextForm
              control={control}
              name="manpowerAsset"
              fieldInput={{ placeholder: 'Masukkan manpower asset' }}
              className="w-[350px]"
            />
          </div>

          <div className="divider" />

          <div className="flex justify-end gap-2 items-end">
            <button
              className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
              type="button"
              onClick={() => router.push('/management/manpower')}
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
