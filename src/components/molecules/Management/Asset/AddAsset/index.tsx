'use client'

import React, { useState } from 'react'
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
import TextAreaForm from '@components/atoms/Form/TextAreaForm'
import RHFMultiSelect from '@components/atoms/MultiSelect'
// import CKEditorWithoutUpload from '@components/atoms/CKEditor/CKEditorWithoutUpload'
import { yupResolver } from '@hookform/resolvers/yup'
import { optionsCapacity, optionsFacility, optionsFloor } from './data'
// import CKTextEditor from '@components/atoms/CKTextEditor'
// import TextEditor from '@components/atoms/TextEditor'

const schema = Yup.object().shape({
  isActive: Yup.boolean().required('Aktif wajib dipilih'),
  location: Yup.object().required('Lokasi wajib dipilih'),
  roomTitle: Yup.string().required('Title Room wajib diisi'),
  floor: Yup.object().required('Lantai Ruangan wajib dipilih'),
  capacity: Yup.object().required('Kapasitas Ruangan wajib dipilih'),
  facilityList: Yup.array(),
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
      Booking Asset Data - Room
    </Link>,
    <Typography key="2" color="text.primary" className="text-heading m semibold-21">
      Add Room Data
    </Typography>,
  ]

  const onSubmit = () => {
    /* ... Your submission logic ... */
  }

  // const [editorData, setEditorData] = useState('')

  // useEffect(() => {
  //   setEditorData('')
  // }, [])

  // const handleEditorChange = (event: any, editor: any) => {
  //   const data = editor.getData()
  //   setEditorData(data)
  // }

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-full w-full">
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
            <TextAreaForm
              control={control}
              name="roomTitle"
              fieldLabel={{ children: 'Title Room' }}
              fieldInput={{ rows: 1 }}
              counter
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
            <div className="">
              {/* <CKEditorWithoutUpload data={editorData} onChange={handleEditorChange} /> */}
              {/* <TextEditor placeholder='Isi deskripsi ruangan' onChange={handleEditorChange} data={editorData} /> */}
              {/* <TextEditor placeholder='Isi deskripsi ruangan' data={editorData} /> */}
              {/* <CKTextEditor
                onChange={handleEditorChange}
                data={editorData}
                placeholder='Start typing your awesome content...'
              /> */}
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Terms & Condition</p>
            <div className="max-w-[650px]">
              {/* <CKEditorWithoutUpload data={editorData} onChange={handleEditorChange} /> */}
              {/* <TextEditor
                placeholder='Isi ketentuan penggunaan yang perlu diketahui'
                onChange={handleEditorChange}
                data={editorData}
              /> */}
              {/* <TextEditor placeholder='Isi ketentuan penggunaan yang perlu diketahui' data={editorData} /> */}
              {/* <CKTextEditor
                onChange={handleEditorChange}
                data={editorData}
                placeholder='Start typing your awesome content...'
              /> */}
            </div>
          </div>

          <div className="flex items-start mt-4">
            <p className="text-heading xs regular-16 w-[160px]">Fasilitas Ruangan</p>
            <RHFMultiSelect
              data={optionsFacility}
              name="facilityList"
              label="Pilih Fasilitas Ruangan"
              control={control}
              className="mt-4 min-w-[650px]"
            />
          </div>

          <div className="flex items-center mt-4">
            <p className="text-heading xs regular-16 w-[160px]">
              Image<span className="text-red-500">*</span>
            </p>
            <div className="max-w-[600px]">
              <ImageGallery />
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
