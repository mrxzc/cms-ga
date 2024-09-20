'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import SelectForm from '@components/atoms/Form/SelectForm'
import ImageGallery from '@components/atoms/ImageGallery'
import RHFMultiSelect from '@components/atoms/MultiSelect'
import TextForm from '@components/atoms/Form/TextForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiSubmitUpdateRoom } from '@services/cms/room/api'
import { optionsFacility } from './data'
import { useGetRoomDetail } from '@services/cms/room/query'
import { EditRoomProps, IRoomDetailParams } from '@interfaces/room'
import { API_FILE_CMS } from '@utils/environment'
import { IGcmRoomFloorListParams } from '@interfaces/gcmRoomFloor'
import { useGetRoomFloor } from '@services/gcm/roomFloor/query'
import { useGetRoomCapacity } from '@services/gcm/roomCapacity/query'
import { OptionItem } from '@interfaces/utils'
import { useGetLocation } from '@services/gcm/location/query'

const ReusableCKEditor = dynamic(() => import('@/components/atoms/ReuseableCKEditor'), { ssr: false })

const schema = Yup.object().shape({
  isActive: Yup.boolean().required('Aktif wajib dipilih'),
  location: Yup.object().required('Lokasi wajib dipilih'),
  roomTitle: Yup.string().required('Title Room wajib diisi'),
  floor: Yup.object().required('Lantai Ruangan wajib dipilih'),
  capacity: Yup.object().required('Kapasitas Ruangan wajib dipilih'),
  selectedFacilities: Yup.array(),
})

export function EditRoom({ category = 'Meeting Room' }: EditRoomProps) {
  const router = useRouter()
  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  const [param, setParam] = useState<IRoomDetailParams>({ roomId: '' })
  const [descriptionData, setDescriptionData] = useState('')
  const [termsData, setTermsData] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [selectedFacility, setSelectedFacility] = useState<string[]>([])
  const [isChecked, setIsChecked] = useState(false)
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  const defaultParams = { search: '', page: 1, size: 50 }
  const [params] = useState<IGcmRoomFloorListParams>(defaultParams)

  const { data: rooms } = useGetRoomDetail(param)
  const { data: floorData } = useGetRoomFloor(params)
  const { data: capacityData } = useGetRoomCapacity(params)
  const { data: locations } = useGetLocation(params)

  const [optionsFloor, setOptionsFloor] = useState<OptionItem[]>([])
  const [optionsCapacity, setOptionsCapacity] = useState<OptionItem[]>([])
  const [optionsLocation, setOptionsLocation] = useState<OptionItem[]>([])

  const convertList = selectedFacility.join(',')

  const { handleSubmit, control, setValue, getValues, watch } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: { selectedFacilities: selectedFacility },
    mode: 'all',
  })

  const breadcrumbs = [
    <Link href="/management/room" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      Booking Asset Data - Room
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Edit Room Data
    </Typography>,
  ]

  useEffect(() => {
    if (slug) setParam({ roomId: slug })
  }, [])

  useEffect(() => {
    if (floorData?.data) {
      const transformedOptions = floorData.data
        .filter(item => item.flagActive)
        .map(item => ({
          label: item.descGcm,
          value: item.noSr,
        }))
      setOptionsFloor(transformedOptions)
    }
  }, [floorData])

  useEffect(() => {
    if (capacityData?.data) {
      const transformedOptions = capacityData.data
        .filter(item => item.flagActive)
        .map(item => ({
          label: item.descGcm,
          value: item.noSr,
        }))
      setOptionsCapacity(transformedOptions)
    }
  }, [capacityData])

  useEffect(() => {
    if (locations?.data) {
      const transformedOptions = locations.data
        .filter(item => item.flagActive)
        .map(item => ({
          label: item.descGcm,
          value: item.noSr,
        }))
      setOptionsLocation(transformedOptions)
    }
  }, [locations])

  useEffect(() => {
    if (rooms?.data && !initialDataLoaded) {
      setValue('isActive', rooms.data.flagActive === 'Y')
      setInitialDataLoaded(true)
    }
  }, [rooms, setValue])

  useEffect(() => {
    if (rooms?.data) {
      setIsChecked(rooms.data.flagActive === 'Y')
      setValue(
        'location',
        optionsLocation.find(option => option.value === rooms?.data?.location)
      )
      setValue('roomTitle', rooms.data.titleRoom)
      setValue(
        'floor',
        optionsFloor.find(option => option.value === rooms?.data?.lantaiRuangan)
      )
      setValue(
        'capacity',
        optionsCapacity.find(option => option.value === rooms?.data?.kapasitas.toString())
      )
      setDescriptionData(rooms.data.deskripsi ?? '')
      setTermsData(rooms.data.termsCondition ?? '')
      setSelectedFacility(rooms.data.fasilitas ?? [])
    }
  }, [rooms, optionsLocation, optionsFloor, optionsCapacity, setValue])

  useEffect(() => {
    const fetchImages = async () => {
      if (!rooms?.data?.fileImages?.length) return
      const newImages: File[] = []

      for (const imageUrl of rooms.data.fileImages) {
        try {
          const response = await fetch(`${API_FILE_CMS}${imageUrl}`)
          const blob = await response.blob()
          const filename = imageUrl.split('/').pop() ?? 'image.png'
          const file = new File([blob], filename, { type: blob.type })
          newImages.push(file)
        } catch (error) {
          toast.error('Failed to fetch image')
        }
      }
      setImages(newImages)
    }
    fetchImages()
  }, [rooms])

  const handleUpdateRoom = async (payload: any) => {
    try {
      const formData: any = new FormData()
      formData.append('titleRoom', payload.roomTitle)
      images.forEach(image => formData.append('fileImages', image))
      formData.append('lantaiRuangan', payload.floor.value.toString())
      formData.append('flagActive', payload.isActive ? 'Y' : 'N')
      formData.append('location', payload.location.value)
      formData.append('kapasitas', payload.capacity.value.toString())
      formData.append('deskripsi', descriptionData)
      formData.append('termsCondition', termsData)
      formData.append('fasilitas', convertList)
      formData.append('kategoriMenu', category)
      formData.append('roomId', slug)

      const response = await apiSubmitUpdateRoom(formData)
      if (response.status === 'T') {
        toast.success('Data ruangan berhasil diubah!')
        router.push('/management/room')
      } else {
        toast.error(`Gagal mengubah data ruangan. ${response.message || response.error || ''}`)
      }
    } catch (error: any) {
      const { response } = error
      const message = response
        ? `Error ${response.status}: ${response.data.message || 'Terjadi kesalahan server.'}`
        : 'Terjadi kesalahan saat mengubah ruangan.'
      toast.error(message)
    }
  }

  useEffect(() => {
    setValue('isActive', isChecked)
  }, [isChecked, watch('isActive')])

  const handleImageChange = (newImages: File[]) => setImages(newImages)
  const handleDescriptionChange = (data: string) => setDescriptionData(data)
  const handleTermsChange = (data: string) => setTermsData(data)
  const handleFacilitySelectionChange = (newSelectedValues: any) => setSelectedFacility(newSelectedValues)

  const onSubmit = async () => {
    const data = getValues()
    handleUpdateRoom(data)
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
        <p className="text-heading s semibold-18 mb-4">Edit Room Data</p>
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
              control={control}
              name="roomTitle"
              fieldInput={{ type: 'text', placeholder: 'Isi dengan title ruangan' }}
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
              options={optionsCapacity}
              setValue={setValue}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Description</p>
            <div className="mt-1">
              <ReusableCKEditor
                initialData={descriptionData}
                onChange={handleDescriptionChange}
                config={{ placeholder: 'Type your text here...' }}
              />
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Terms & Condition</p>
            <div className="max-w-[650px] mt-1">
              <ReusableCKEditor
                initialData={termsData}
                onChange={handleTermsChange}
                config={{ placeholder: 'Type your text here...' }}
              />
            </div>
          </div>

          <div className="flex items-center mt-1">
            <p className="text-heading xs regular-16 w-[160px]">Fasilitas Ruangan</p>
            <div className="w-[650px]">
              <RHFMultiSelect
                data={optionsFacility}
                name="selectedFacilities"
                label="Pilih Fasilitas"
                control={control as Control<any>}
                onValuesChange={handleFacilitySelectionChange}
                choosedValue={selectedFacility}
              />
            </div>
          </div>

          <div className="flex items-center mt-1">
            <div className="text-heading xs regular-16 w-[160px]">
              Image<span className="text-red-500">*</span>
              <p className="text-paragraph regular-14 mt-2">{images.length}/10</p>
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
