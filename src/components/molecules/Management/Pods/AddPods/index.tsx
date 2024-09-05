'use client'

import React, { useEffect, useState } from 'react'
import { Control, useForm } from 'react-hook-form'
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
import TextForm from '@components/atoms/Form/TextForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { optionsCapacity, optionsFloor } from './data'

import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { apiSubmitCreateRoom } from '@services/cms/room/api'

const ReusableCKEditor = dynamic(() => import('@/components/atoms/ReuseableCKEditor'), { ssr: false })

const schema = Yup.object().shape({
  isActive: Yup.boolean().required('Aktif wajib dipilih'),
  location: Yup.object().required('Lokasi wajib dipilih'),
  roomTitle: Yup.string().required('Title Room wajib diisi'),
  floor: Yup.object().required('Lantai Ruangan wajib dipilih'),
  capacity: Yup.object().required('Kapasitas Ruangan wajib dipilih'),
})

export function AddPods({ category = 'Pods' }: { category?: string }) {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)
  const [descriptionData, setDescriptionData] = useState('')
  const [termsData, setTermsData] = useState('')
  const [images, setImages] = useState<File[]>([])

  const handleImageChange = (newImages: File[]) => {
    setImages(newImages)
  }

  const { handleSubmit, control, setValue, getValues } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const optionsLocation = [
    { label: 'Head Office', value: 'ACC' },
    { label: 'Berijalan', value: 'BERIJALAN' },
  ]

  const breadcrumbs = [
    <Link href="/management/pods" key="1" className="text-heading m semibold-21 text-[#235696] hover:underline">
      Booking Asset Data - Pods Data
    </Link>,
    <Typography key="2" color="text.primary" className="text-heading m semibold-21">
      Add Pods Data
    </Typography>,
  ]

  const handleDescriptionChange = (data: string) => {
    setDescriptionData(data)
  }

  const handleTermsChange = (data: string) => {
    setTermsData(data)
  }

  useEffect(() => {
    setValue('isActive', isChecked)
  }, [isChecked])

  const [selectedFacility, setSelectedFacility] = useState([])

  const convertList = selectedFacility.join(',')

  const optionsFacility = [
    { value: 'kursi', name: 'Kursi' },
    { value: 'meja', name: 'Meja' },
    { value: 'proyektor', name: 'Proyektor' },
    { value: 'speaker', name: 'Speaker' },
  ]

  const handleFacilitySelectionChange = (newSelectedValues: any) => {
    setSelectedFacility(newSelectedValues)
  }

  const handleCreateRoom = async (payload: any) => {
    try {
      // 1. Siapkan FormData
      const formData: any = new FormData()
      formData.append('titleRoom', payload.roomTitle)
      if (images && images.length > 0) {
        for (const image of images) {
          formData.append('fileImages', image)
        }
      }
      formData.append('lantaiRuangan', payload.floor.value.toString()) // Convert to string
      formData.append('flagActive', payload.isActive ? 'Y' : 'N')
      formData.append('location', payload.location.value)
      formData.append('kapasitas', payload.capacity.value.toString()) // Convert to string
      formData.append('deskripsi', descriptionData)
      formData.append('termsCondition', termsData)
      formData.append('fasilitas', convertList)
      formData.append('kategoriMenu', category)

      // 2. Panggil fungsi API (pastikan apiSubmitCreateRoom bisa menangani FormData)
      const response = await apiSubmitCreateRoom(formData)

      // 3. Tangani respons
      if (response.status === 'T') {
        toast.success('Pods berhasil dibuat!')
        router.push('/management/pods')
      } else {
        // Tampilkan pesan error yang lebih spesifik jika ada
        let errorMessage = 'Gagal membuat ruangan.'
        if (response.message) {
          errorMessage += ` ${response.message}`
        } else if (response.error && response.error.length > 0) {
          errorMessage += ` ${response.error}`
        }
        toast.error(errorMessage)
      }
    } catch (error: any) {
      // Tangani error yang lebih spesifik
      if (error.response) {
        // Error dari server (misalnya 400, 500)
        const { status, data } = error.response
        toast.error(`Error ${status}: ${data.message || 'Terjadi kesalahan server.'}`)
      } else if (error.request) {
        // Permintaan dikirim tapi tidak ada respons
        toast.error('Tidak ada respons dari server. Periksa koneksi internet Anda.')
      } else {
        // Error lain saat menyiapkan permintaan
        toast.error('Terjadi kesalahan saat membuat ruangan.')
      }
    }
  }

  const onSubmit = async () => {
    const data = getValues()
    handleCreateRoom(data)
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
        <p className="text-heading s semibold-18 mb-4">Add Pods Data</p>
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
              options={optionsLocation}
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
              <ReusableCKEditor
                config={{
                  placeholder: 'Type your text here...',
                }}
                initialData={descriptionData}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>

          <div className="flex items-center">
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
          </div>

          <div className="flex items-center mt-1">
            <p className="text-heading xs regular-16 w-[160px]">Fasilitas Ruangan</p>
            <RHFMultiSelect
              data={optionsFacility}
              name="fruits"
              label="Pilih Buah"
              control={control as Control<any>}
              onValuesChange={handleFacilitySelectionChange}
            />
          </div>

          <div className="flex items-center mt-1">
            <div className="text-heading xs regular-16 w-[160px]">
              <p>
                Image<span className="text-red-500">*</span>
              </p>
              {images.length > 0 && <p className="text-paragraph regular-14 mt-2">{images?.length}/10</p>}
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
              onClick={() => router.push('/management/pods')}
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
