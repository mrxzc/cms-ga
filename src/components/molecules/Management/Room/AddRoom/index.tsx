'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Control } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

import SelectForm from '@components/atoms/Form/SelectForm'
import ImageGallery from '@components/atoms/ImageGallery'
import RHFMultiSelect from '@components/atoms/MultiSelect'
import TextForm from '@components/atoms/Form/TextForm'
import { apiSubmitCreateRoom } from '@services/cms/room/api'
import { optionsFacility } from './data'
import { useGetRoomFloor } from '@services/gcm/roomFloor/query'
import { useGetRoomCapacity } from '@services/gcm/roomCapacity/query'
import { useGetLocation } from '@services/gcm/location/query'
import { IGcmRoomFloorListParams } from '@interfaces/gcmRoomFloor'
import { OptionItem } from '@interfaces/utils'

const ReusableCKEditor = dynamic(() => import('@/components/atoms/ReuseableCKEditor'), { ssr: false })

// Validation schema
const schema = Yup.object().shape({
  isActive: Yup.boolean().required('Aktif wajib dipilih'),
  location: Yup.object().required('Lokasi wajib dipilih'),
  roomTitle: Yup.string().required('Title Room wajib diisi'),
  floor: Yup.object().required('Lantai Ruangan wajib dipilih'),
  capacity: Yup.object().required('Kapasitas Ruangan wajib dipilih'),
})

export function AddRoom({ category = 'Meeting Room' }: { category?: string }) {
  const router = useRouter()

  // State variables
  const defaultParams = { search: '', page: 1, size: 50 }
  const [params] = useState<IGcmRoomFloorListParams>(defaultParams)
  const [isChecked, setIsChecked] = useState(false)
  const [descriptionData, setDescriptionData] = useState('')
  const [termsData, setTermsData] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [selectedFacility, setSelectedFacility] = useState<string[]>([])

  // Options state
  const [optionsFloor, setOptionsFloor] = useState<OptionItem[]>([])
  const [optionsCapacity, setOptionsCapacity] = useState<OptionItem[]>([])
  const [optionsLocation, setOptionsLocation] = useState<OptionItem[]>([])

  // Form handling
  const { handleSubmit, control, setValue, getValues } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  // Fetch data hooks
  const { data: floorData } = useGetRoomFloor(params)
  const { data: capacityData } = useGetRoomCapacity(params)
  const { data: locations } = useGetLocation(params)

  // Update options based on fetched data
  useEffect(() => {
    if (floorData?.data) {
      const transformedOptions = floorData.data
        .filter(item => item.flagActive)
        .map(item => ({ label: item.descGcm, value: item.noSr }))
      setOptionsFloor(transformedOptions)
    }
  }, [floorData])

  useEffect(() => {
    if (capacityData?.data) {
      const transformedOptions = capacityData.data
        .filter(item => item.flagActive)
        .map(item => ({ label: item.descGcm, value: item.noSr }))
      setOptionsCapacity(transformedOptions)
    }
  }, [capacityData])

  useEffect(() => {
    if (locations?.data) {
      const transformedOptions = locations.data
        .filter(item => item.flagActive)
        .map(item => ({ label: item.descGcm, value: item.noSr }))
      setOptionsLocation(transformedOptions)
    }
  }, [locations])

  // Event handlers
  const handleImageChange = (newImages: File[]) => setImages(newImages)
  const handleDescriptionChange = (data: string) => setDescriptionData(data)
  const handleTermsChange = (data: string) => setTermsData(data)
  const handleFacilitySelectionChange = (newSelectedValues: string[]) => setSelectedFacility(newSelectedValues)

  useEffect(() => {
    setValue('isActive', isChecked)
  }, [isChecked, setValue])

  const handleCreateRoom = async (payload: any) => {
    try {
      const formData: any = new FormData()
      formData.append('titleRoom', payload.roomTitle)

      if (images.length > 0) {
        images.forEach(image => formData.append('fileImages', image))
      }

      formData.append('lantaiRuangan', payload.floor.value.toString())
      formData.append('flagActive', payload.isActive ? 'Y' : 'N')
      formData.append('location', payload.location.value)
      formData.append('kapasitas', payload.capacity.value.toString())
      formData.append('deskripsi', descriptionData)
      formData.append('termsCondition', termsData)
      formData.append('fasilitas', selectedFacility.join(','))
      formData.append('kategoriMenu', category)

      const response = await apiSubmitCreateRoom(formData)

      if (response.status === 'T') {
        toast.success('Ruangan berhasil dibuat!')
        router.push('/management/room')
      } else {
        const errorMessage = response.message || response.error || 'Gagal membuat ruangan.'
        toast.error(errorMessage)
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Terjadi kesalahan saat membuat ruangan.'
      toast.error(message)
    }
  }

  const onSubmit = async () => {
    const data = getValues()
    handleCreateRoom(data)
  }

  // Breadcrumbs
  const breadcrumbs = [
    <Link href="/management/room" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      Booking Asset Data - Room
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Add Room Data
    </Typography>,
  ]

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-screen w-full overflow-y-auto">
      <div className="bg-white px-4 py-4 rounded-xl mb-4 flex gap-2 items-center">
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
            <label>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
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
              placeholder="Pilih lokasi pengajuan"
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
                config={{ placeholder: 'Type your text here...' }}
                initialData={descriptionData}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Terms & Condition</p>
            <div className="max-w-[650px] mt-1">
              <ReusableCKEditor
                config={{ placeholder: 'Type your text here...' }}
                initialData={termsData}
                onChange={handleTermsChange}
              />
            </div>
          </div>

          <div className="flex items-center mt-1">
            <p className="text-heading xs regular-16 w-[160px]">Fasilitas Ruangan</p>
            <div className="w-[650px]">
              <RHFMultiSelect
                data={optionsFacility}
                name="fruits"
                label="Pilih Fasilitas"
                control={control as Control<any>}
                onValuesChange={handleFacilitySelectionChange}
              />
            </div>
          </div>

          <div className="flex items-center mt-1">
            <div className="text-heading xs regular-16 w-[160px]">
              Image<span className="text-red-500">*</span>
              <p className="text-paragraph regular-14 mt-2">{images?.length}/10</p>
              <p className="text-paragraph regular-14 text-gray-500">
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
  )
}
