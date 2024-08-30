'use client'

import TextAreaForm from '@components/atoms/Form/TextAreaForm'
import TextForm from '@components/atoms/Form/TextForm'
import ImageGallery from '@components/atoms/ImageGallery'
import { yupResolver } from '@hookform/resolvers/yup'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  km: Yup.string().required('KM wajib diisi'),
  name: Yup.string().required('Nama security wajib diisi'),
  time: Yup.string().required('Jam wajib diisi'),
  condition: Yup.string().required('Kondisi wajib diisi'),
  desc: Yup.string().required('Deskripsi wajib diisi'),
})

export function Add() {
  const router = useRouter()

  const [images, setImages] = useState<File[]>([])
  const handleImageChange = (newImages: File[]) => {
    setImages(newImages)
  }

  const [imagesOut, setImagesOut] = useState<File[]>([])
  const handleImageOutChange = (newImages: File[]) => {
    setImagesOut(newImages)
  }

  const { handleSubmit, control } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const breadcrumbs = [
    <Link href="/master/car-brand" key="1" className="text-heading m semibold-21 text-[#235696] hover:underline">
      Form Keluar Kendaraan
    </Link>,
    // <Typography key="2" color="text.primary" className="text-heading m semibold-21">
    //   Add Brand Mobil
    // </Typography>,
  ]

  const onSubmit = () => {}

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-screen w-full overflow-y-auto">
      {images && <></>}
      {imagesOut && <></>}
      <div className="bg-white px-4 py-4 rounded-xl mb-4 flex gap-2 items-center ">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Form Keluar kendaraan</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Aktif</p>
            <label>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                value={''}
              />{' '}
            </label>
          </div> */}

          {/* <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Lokasi<span className="text-red-500">*</span>
            </p>
            <SelectForm
              control={control}
              name="location"
              placeholder="Pilih kategori pengajuan"
              options={optionsLocation}
              setValue={setValue}
              className="w-[350px]"
            />
          </div> */}

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              KM Berangkat<span className="text-red-500">*</span>
            </p>
            <TextForm
              fieldInput={{ type: 'text', placeholder: 'Isi km' }}
              control={control}
              name="km"
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Nama Security<span className="text-red-500">*</span>
            </p>
            <TextForm
              fieldInput={{ type: 'text', placeholder: 'Isi nama' }}
              control={control}
              name="name"
              className="w-[350px]"
            />
          </div>
          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Jam Mobil Keluar<span className="text-red-500">*</span>
            </p>
            <TextForm
              fieldInput={{ type: 'text', placeholder: 'Isi jam' }}
              control={control}
              name="time"
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Kondisi Mobil Sebelum Keluar<span className="text-red-500">*</span>
            </p>
            <TextAreaForm
              fieldInput={{ type: 'text', placeholder: 'Isi kondisi' }}
              control={control}
              name="condition"
              className="w-[350px]"
            />
          </div>

          {/* <div className="flex items-center">
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
          </div> */}

          {/* <div className="flex items-center">
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
          </div> */}

          {/* <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Terms & Condition</p>
            <div className="max-w-[650px] mt-1">
              <ReusableCKEditor
                config={{
                  placeholder: 'Type your text here...',
                }}
                initialData={termsData}
                onChange={handleTermsChange}
              />
            </div>
          </div> */}

          {/* <div className="flex items-center mt-1">
            <p className="text-heading xs regular-16 w-[160px]">Fasilitas Ruangan</p>
            <div className="w-[650px]">
              <RHFMultiSelect
                data={optionsFacility}
                name="fruits"
                label="Pilih Buah"
                control={control as Control<any>}
                onValuesChange={handleFacilitySelectionChange}
              />
            </div>
          </div> */}

          <div className="flex items-center mt-1">
            <div className="text-heading xs regular-16 w-[160px]">
              Foto Kondisi BBM<span className="text-red-500">*</span>
              {/* <p className="text-paragraph regular-14 text-gray-500 ">
                Format (.png / .jpeg / .jpg) size max 5MB & ratio 2:1
              </p> */}
            </div>
            <div className="max-w-[600px]">
              <ImageGallery setImages={handleImageChange} />
            </div>
          </div>

          <div className="flex items-center mt-1">
            <div className="text-heading xs regular-16 w-[160px]">
              Foto 4 sisi mobil<span className="text-red-500">*</span>
              {/* <p className="text-paragraph regular-14 text-gray-500 ">
                Format (.png / .jpeg / .jpg) size max 5MB & ratio 2:1
              </p> */}
            </div>
            <div className="max-w-[600px]">
              <ImageGallery setImages={handleImageOutChange} />
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">
              Deskripsikan kondisi foto mobil<span className="text-red-500">*</span>
            </p>

            <TextAreaForm
              fieldInput={{ type: 'text', placeholder: 'Isi kondisi' }}
              control={control}
              name="desc"
              className="w-[350px]"
            />
          </div>

          <div className="divider" />

          <div className="flex justify-end gap-2 items-end">
            <button
              className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
              type="button"
              onClick={() => router.push('/management/room')}
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

    // <div className="px-4 py-8 bg-[#f6f6f6] h-screen w-full overflow-y-auto">
    //   <div className="bg-white px-4 py-4 rounded-xl mb-4 flex gap-2 items-center ">
    //     <Stack spacing={2}>
    //       <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
    //         {breadcrumbs}
    //       </Breadcrumbs>
    //     </Stack>
    //   </div>

    //   <div className="bg-white px-4 py-4 rounded-xl">
    //     <p className="text-heading s semibold-18 mb-4">Add Brand Mobil</p>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="flex items-center">
    //         <p className="text-heading xs regular-16 w-[160px]">
    //           Title <span className="text-red-500">*</span>
    //         </p>
    //         <TextAreaForm
    //           control={control}
    //           name="title"
    //           fieldLabel={{ children: 'Title' }}
    //           fieldInput={{ rows: 1 }}
    //           counter
    //           className="w-[350px]"
    //         />
    //       </div>

    //       <div className="divider" />

    //       <div className="flex justify-end gap-2 items-end">
    //         <button
    //           className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
    //           type="button"
    //           onClick={() => router.push('/master/car-brand')}
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           className="bg-[#235696] text-[#e5f2fc] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
    //           type="submit"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  )
}
