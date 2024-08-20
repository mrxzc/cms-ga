'use client'

import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import * as Yup from 'yup'

import SelectForm from '@components/atoms/Form/SelectForm'
import ImageGallery from '@components/atoms/ImageGallery'
import RHFMultiSelect from '@components/atoms/MultiSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { optionsCapacity, optionsFacility, optionsFloor } from './data'
import TextForm from '@components/atoms/Form/TextForm'
// import TextEditor from '@components/atoms/TextEditor';
// import ReusableCKEditor from '@components/atoms/ReuseableCKEditor';

const schema = Yup.object().shape({
  isActive: Yup.boolean().required('Aktif wajib dipilih'),
  location: Yup.object().required('Lokasi wajib dipilih'),
  roomTitle: Yup.string().required('Title Room wajib diisi'),
  floor: Yup.object().required('Lantai Ruangan wajib dipilih'),
  capacity: Yup.object().required('Kapasitas Ruangan wajib dipilih'),
  facilityList: Yup.array(),
  images: Yup.array(),
})

export function AddPods() {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)

  // const [images, setImages] = useState<(File | null)[]>(Array(10).fill(null));

  const [images, setImages] = useState<File[]>([])
  const handleImageChange = (newImages: File[]) => {
    setImages(newImages)
  }

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
      Booking Asset Data - Room
    </Link>,
    <Typography key="2" color="text.primary" className="text-heading m semibold-21">
      Add Room Data
    </Typography>,
  ]

  // const [descriptionData, setDescriptionData] = useState('');
  // const handleDescriptionChange = (data: string) => {
  //   setDescriptionData(data);
  // };

  // const [termsData, setTermsData] = useState('');
  // const handleTermsChange = (data: string) => {
  //   setTermsData(data);
  // };

  const facilityList = useWatch({
    control,
    name: 'facilityList',
  })

  useEffect(() => {
    setValue('isActive', isChecked)
  }, [isChecked])

  useEffect(() => {
    setValue('facilityList', facilityList)
  }, [facilityList, setValue])

  useEffect(() => {
    setValue('images', images)
  }, [])

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
        <p className="text-heading s semibold-18 mb-4">Add Room Data</p>
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
              Title Room<span className="text-red-500">*</span>
            </p>

            <TextForm
              fieldInput={{ type: 'text', placeholder: 'Isi dengan title ruangan' }}
              control={control}
              name="roomTitle"
              maxChar={32}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Lantai Ruangan<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="floor"
              placeholder="Pilih lantai ruangan"
              options={optionsFloor}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Kapasitas Ruangan<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="capacity"
              placeholder="Pilih kapasitas ruangan"
              options={optionsCapacity}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Description</p>
            <div className="mt-1">
              {/* <TextEditor
                placeholder="Isi deskripsi ruangan"
                onChange={handleDescriptionChange}
                data={descriptionData}
              /> */}
              {/* <ReusableCKEditor
                config={{
                  placeholder: 'Type your text here...'
                }}
                initialData={descriptionData}
                onChange={handleDescriptionChange}
              /> */}
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Terms & Condition</p>
            <div className="max-w-[650px] mt-1">
              {/* <TextEditor
                placeholder="Isi ketentuan penggunaan yang perlu diketahui"
                onChange={handleTermsChange}
                data={termsData}
              /> */}
              {/* <ReusableCKEditor
                config={{
                  placeholder: 'Type your text here...'
                }}
                initialData={termsData}
                onChange={handleTermsChange}
              /> */}
            </div>
          </div>

          <div className="flex items-center mt-1">
            <p className="text-heading xs regular-16 w-[160px]">Fasilitas Ruangan</p>
            <RHFMultiSelect
              data={optionsFacility}
              name="facilityList"
              label="Pilih Fasilitas Ruangan"
              control={control}
              className=" min-w-[650px]"
            />
          </div>

          <div className="flex items-center mt-1">
            <div className="text-heading xs regular-16 w-[160px]">
              <p>
                Image<span className="text-red-500">*</span>
              </p>
              {images.length >= 0 && <p className="text-paragraph regular-14 mt-2">{images.length}/10</p>}
              <p className="text-paragraph regular-14 text-gray-500 ">
                Format (.png / .jpeg / .jpg) size max 5MB & ratio 2:1
              </p>
            </div>
            <div className="max-w-[600px]">
              <ImageGallery setImages={handleImageChange} />
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
