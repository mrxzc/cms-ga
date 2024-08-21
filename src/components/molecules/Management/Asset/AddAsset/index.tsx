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

import SelectForm from '@components/atoms/Form/SelectForm'
import { yupResolver } from '@hookform/resolvers/yup'
import TextForm from '@components/atoms/Form/TextForm'
import AddWithTable from '@components/atoms/AddWithTable'

const schema = Yup.object().shape({
  isActive: Yup.boolean().required('Aktif wajib dipilih'),
  asset: Yup.string().required('Nama asset wajib diisi'),
  location: Yup.object().required('Lokasi wajib dipilih'),
  floor: Yup.object().required('Lokasi wajib dipilih'),
  roomTitle: Yup.string().required('Title Room wajib diisi'),
})

export function AddAsset() {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)

  const { handleSubmit, control, setValue } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const options = [
    { label: 'Head Office', value: 1 },
    { label: 'Berijalan', value: 2 },
  ]

  const breadcrumbs = [
    <Link href="/management/asset" key="1" className="text-heading m semibold-21 text-[#235696] hover:underline">
      Booking Asset Data - Asset Data
    </Link>,
    <Typography key="2" color="text.primary" className="text-heading m semibold-21">
      Add Asset Data
    </Typography>,
  ]

  useEffect(() => {
    setValue('isActive', isChecked)
  }, [isChecked])

  const onSubmit = () => {
    /* ... Your submission logic ... */
  }

  const [brands] = useState<any[]>([
    { name: 'Brand A', stock: 5, isActive: true },
    { name: 'Brand B', stock: 2, isActive: false },
  ])

  // Opsi-opsi untuk SelectInput
  const [selectOptions, setSelectOptions] = useState([
    { value: 'Brand X', label: 'Brand X' },
    { value: 'Brand Y', label: 'Brand Y' },
    { value: 'Brand Z', label: 'Brand Z' },
  ])

  const handleAddBrand = () => {
    // Di sini Anda bisa menambahkan logika untuk menyimpan data ke server atau state global.
  }

  const handleUpdateBrand = () => {
    // Di sini Anda bisa menambahkan logika untuk memperbarui data di server atau state global.
  }

  const handleDeleteBrand = () => {
    // Di sini Anda bisa menambahkan logika untuk menghapus data dari server atau state global.
  }

  const handleUpdateSelectOptions = (newOptions: any) => {
    setSelectOptions(newOptions)
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
        <p className="text-heading s semibold-18 mb-4">Add Asset Data</p>
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
              Asset<span className="text-red-500">*</span>
            </p>
            <TextForm
              control={control}
              name="asset"
              fieldInput={{ placeholder: 'Masukkan nama asset' }}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Lokasi<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="location"
              placeholder="Pilih lokasi asset"
              options={options}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Brand<span className="text-red-500">*</span>
            </p>
            <div className="mt-1">
              <AddWithTable
                initialBrands={brands}
                onAddBrand={handleAddBrand}
                onUpdateBrand={handleUpdateBrand}
                onDeleteBrand={handleDeleteBrand}
                selectOptions={selectOptions}
                onUpdateSelectOptions={handleUpdateSelectOptions}
              />
            </div>
          </div>

          <div className="divider" />

          <div className="flex justify-end gap-2 items-end">
            <button
              className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
              type="button"
              onClick={() => router.push('/management/asset')}
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
