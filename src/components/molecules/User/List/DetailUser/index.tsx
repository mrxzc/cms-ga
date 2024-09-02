'use client'

import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import TextForm from '@components/atoms/Form/TextForm'
import SelectForm from '@components/atoms/Form/SelectForm'
import { optionsRole } from './data'

const schema = Yup.object().shape({
  isActive: Yup.string().required('Aktif wajib dipilih'),
  manpowerAsset: Yup.string().required('Manpower asset wajib dipilih'),
})

export function DetailUser() {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)

  const { handleSubmit, control, setValue } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const breadcrumbs = [
    <Link href="/user-management" key="1" className="text-heading m semibold-21 text-[#235696] hover:underline">
      User Management - List User
    </Link>,
    <Typography key="2" color="text.primary" className="text-heading m semibold-21">
      Detail User
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
        <p className="text-heading s semibold-18 mb-4">Detail User</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Aktif</p>
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
            <p className="text-paragraph regular-14 w-[160px] mr-10">Kode User</p>
            <TextForm
              control={control}
              name="code"
              fieldInput={{ placeholder: 'Masukkan kode user', disabled: true }}
              className="w-[660px]"
            />
          </div>
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Nama</p>
            <TextForm
              control={control}
              name="name"
              fieldInput={{ placeholder: 'Masukkan nama user', disabled: true }}
              className="w-[660px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Email</p>
            <TextForm
              control={control}
              name="email"
              fieldInput={{ placeholder: 'Masukkan email user', disabled: true }}
              className="w-[660px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">No Handphone</p>
            <TextForm
              control={control}
              name="noHandphone"
              fieldInput={{ placeholder: 'Masukkan no handphone', disabled: true }}
              className="w-[660px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Tanggal Lahir</p>
            <TextForm
              control={control}
              name="tanggalLahir"
              fieldInput={{ placeholder: 'Masukkan tanggal lahir user', disabled: true }}
              className="w-[660px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Role</p>
            <SelectForm
              control={control}
              name="role"
              placeholder="Pilih role user"
              options={optionsRole}
              setValue={setValue}
              className="w-[660px]"
            />
          </div>

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
