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
import ImageGallery from '@components/atoms/ImageGallery'
import { yupResolver } from '@hookform/resolvers/yup'
import { optionsCapacity, optionsFloor } from './data'
import TextForm from '@components/atoms/Form/TextForm'

import dynamic from 'next/dynamic'
const ReusableCKEditor = dynamic(() => import('@/components/atoms/ReuseableCKEditor'), { ssr: false })

const schema = Yup.object().shape({
  isActive: Yup.string().required('Aktif wajib dipilih'),
  location: Yup.object().required('Lokasi wajib dipilih'),
  operational: Yup.object().required('Operational wajib dipilih'),
  carBrand: Yup.object().required('Brand wajib dipilih'),
  carType: Yup.object().required('Tipe wajib dipilih'),
  transmissionType: Yup.object().required('Transmisi wajib dipilih'),
  fuelType: Yup.object().required('Bahan Bakar wajib dipilih'),
  year: Yup.object().required('Tahun wajib dipilih'),
  noPolisi: Yup.string().required('Nomor Polisi wajib diisi'),
  images: Yup.array(),
})

export function AddVehicle() {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)
  // const [images, setImages] = useState<(File | null)[]>(Array(10).fill(null));
  const [images, setImages] = useState<File[]>([])
  const handleImageChange = (newImages: File[]) => {
    setImages(newImages)
  }

  const { handleSubmit, control, setValue, watch } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const options = [
    { label: 'Head Office', value: 1 },
    { label: 'Berijalan', value: 2 },
  ]

  const breadcrumbs = [
    <Link href="/management/vehicle" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      Booking Asset Data - Vehicle Data
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Add Vehicle Data
    </Typography>,
  ]

  const [termsData, setTermsData] = useState('')
  const handleTermsChange = (data: string) => {
    setTermsData(data)
  }

  useEffect(() => {
    setValue('isActive', isChecked ? 'Active' : 'Non-Active')
  }, [isChecked])

  useEffect(() => {
    setValue('images', images)
  }, [])

  const onSubmit = () => {
    /* ... Your submission logic ... */
  }

  function cekGanjilGenap(nomorPlat: string): string {
    // Cari angka terakhir dari belakang, melewati karakter non-digit
    let angkaTerakhir = null
    for (let i = nomorPlat.length - 1; i >= 0; i--) {
      if (!isNaN(parseInt(nomorPlat[i]))) {
        angkaTerakhir = parseInt(nomorPlat[i])
        break
      }
    }

    // Jika tidak ditemukan angka, berikan pesan kesalahan
    if (angkaTerakhir === null) {
      return 'Format nomor plat tidak valid'
    }

    // Periksa apakah angka terakhir ganjil atau genap
    if (angkaTerakhir % 2 === 0) {
      return 'Genap'
    } else {
      return 'Ganjil'
    }
  }

  useEffect(() => {
    const a = watch('noPolisi')
    // Tambahkan timeout 1 detik
    const timeoutId = setTimeout(() => {
      setValue('plat', cekGanjilGenap(a))
    }, 1000)
    // Bersihkan timeout saat komponen dibongkar
    return () => clearTimeout(timeoutId)
  }, [watch('noPolisi')])

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
        <p className="text-heading s semibold-18 mb-4">Add Vehicle Data</p>
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
              Lokasi<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="location"
              placeholder="Pilih kategori pengajuan"
              options={options}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Operational<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="operational"
              placeholder="Pilih operational"
              options={optionsFloor}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Brand<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="carBrand"
              placeholder="Pilih brand mobil"
              options={optionsFloor}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Tipe<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="carType"
              placeholder="Pilih tipe mobil"
              options={optionsCapacity}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Transmisi<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="transmissionType"
              placeholder="Pilih tipe transmisi"
              options={optionsCapacity}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Bahan Bakar<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="fuelType"
              placeholder="Pilih tipe bahan bakar"
              options={optionsCapacity}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Tahun<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="year"
              placeholder="Pilih tahun"
              options={optionsCapacity}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Kapasitas Mobil</p>
            <TextForm
              control={control}
              name="carCapacity"
              fieldInput={{ placeholder: 'Masukkan kapasitas mobil', disabled: true }}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Nomor Polisi<span className="text-red-500">*</span>
            </p>
            <TextForm
              control={control}
              name="noPolisi"
              fieldInput={{ placeholder: 'Masukkan nomor polisi' }}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Plat</p>
            <TextForm
              control={control}
              name="plat"
              fieldInput={{ placeholder: 'Masukkan plat', disabled: true }}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Terms & Condition</p>
            <div className="mt-1">
              <ReusableCKEditor
                config={{
                  placeholder: 'Type your text here...',
                }}
                initialData={termsData}
                onChange={handleTermsChange}
              />
            </div>
          </div>

          <div className="flex items-center mt-1">
            <div className="text-heading xs regular-16 w-[160px]">
              Image<span className="text-red-500">*</span>
              {images.length >= 0 && <p className="text-paragraph regular-14 mt-2">{images?.length}/10</p>}
              <p className="text-paragraph regular-14 text-gray-500 ">
                Format (.png / .jpeg / .jpg) size max 5MB & ratio 2:1
              </p>
            </div>
            <div className="max-w-[600px]">
              <ImageGallery setImages={handleImageChange} images={images} />
            </div>
          </div>

          <div className="divider" />

          <div className="flex justify-end gap-2 items-end">
            <button
              className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
              type="button"
              onClick={() => router.push('/management/vehicle')}
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
