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
import { optionsCapacity, optionsFacility, optionsFloor, optionsLocation } from './data'
import { useGetRoomDetail } from '@services/cms/room/query'
import { EditRoomProps, IRoomDetailParams } from '@interfaces/room'
import { API_FILE_CMS } from '@utils/environment'

const ReusableCKEditor = dynamic(() => import('@/components/atoms/ReuseableCKEditor'), { ssr: false })

const schema = Yup.object().shape({
  isActive: Yup.boolean().required('Aktif wajib dipilih'),
  location: Yup.object().required('Lokasi wajib dipilih'),
  roomTitle: Yup.string().required('Title Ballroom wajib diisi'),
  floor: Yup.object().required('Lantai Ruangan wajib dipilih'),
  capacity: Yup.object().required('Kapasitas Ruangan wajib dipilih'),
  selectedFacilities: Yup.array(),
})

export function EditBallroom({ category = 'Ballroom' }: EditRoomProps) {
  const [param, setParam] = useState<IRoomDetailParams>({
    roomId: '',
  })

  const router = useRouter()
  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  const { data: ballroom } = useGetRoomDetail(param)
  const [descriptionData, setDescriptionData] = useState('')
  const [termsData, setTermsData] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [selectedFacility, setSelectedFacility] = useState<string[]>([])
  const [isChecked, setIsChecked] = useState(false)
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  const convertList = selectedFacility.join(',')

  const { handleSubmit, control, setValue, getValues, watch } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      selectedFacilities: selectedFacility,
    },
    mode: 'all',
  })

  const breadcrumbs = [
    <Link href="/management/room" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      Booking Asset Data - Ballroom
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Edit Ballroom Data
    </Typography>,
  ]

  const handleImageChange = (newImages: File[]) => {
    setImages(newImages)
  }

  const handleDescriptionChange = (data: string) => {
    setDescriptionData(data)
  }

  const handleTermsChange = (data: string) => {
    setTermsData(data)
  }

  const handleFacilitySelectionChange = (newSelectedValues: any) => {
    setSelectedFacility(newSelectedValues)
  }

  const handleUpdateRoom = async (payload: any) => {
    try {
      // 1. Prepare FormData
      const formData: any = new FormData()
      formData.append('titleRoom', payload.roomTitle)
      if (images && images.length > 0) {
        for (const image of images) {
          formData.append('fileImages', image)
        }
      }
      formData.append('lantaiRuangan', payload.floor.value.toString())
      formData.append('flagActive', payload.isActive ? 'Y' : 'N')
      formData.append('location', payload.location.value)
      formData.append('kapasitas', payload.capacity.value.toString())
      formData.append('deskripsi', descriptionData)
      formData.append('termsCondition', termsData)
      formData.append('fasilitas', convertList)
      formData.append('kategoriMenu', category)
      formData.append('roomId', slug) // Include the roomId in the FormData

      // 2. Call the API function to update the room
      const response = await apiSubmitUpdateRoom(formData)

      // 3. Handle the response
      if (response.status === 'T') {
        toast.success('Data ruangan berhasil diubah!')
        router.push('/management/room')
      } else {
        // Display a more specific error message if available
        let errorMessage = 'Gagal mengubah data ruangan.'
        if (response.message) {
          errorMessage += ` ${response.message}`
        } else if (response.error && response.error.length > 0) {
          errorMessage += ` ${response.error}`
        }
        toast.error(errorMessage)
      }
    } catch (error: any) {
      // Handle specific errors
      if (error.response) {
        const { status, data } = error.response
        toast.error(`Error ${status}: ${data.message || 'Terjadi kesalahan server.'}`)
      } else if (error.request) {
        toast.error('Tidak ada respons dari server. Periksa koneksi internet Anda.')
      } else {
        toast.error('Terjadi kesalahan saat mengubah ruangan.')
      }
    }
  }

  const onSubmit = async () => {
    const data = getValues()
    handleUpdateRoom(data)
  }

  useEffect(() => {
    setValue('isActive', isChecked)
  }, [isChecked, watch('isActive')])

  useEffect(() => {
    if (slug) {
      setParam({ roomId: slug })
    }
  }, [])

  useEffect(() => {
    if (ballroom?.data && !initialDataLoaded) {
      setValue('isActive', ballroom.data.flagActive === 'Y')
      setInitialDataLoaded(true)
    }
  }, [ballroom, setValue])

  useEffect(() => {
    if (ballroom?.data) {
      setIsChecked(ballroom.data.flagActive === 'Y')
    }
  }, [ballroom])

  useEffect(() => {
    if (ballroom?.data) {
      setValue('isActive', ballroom.data.flagActive === 'Y')
      setValue('location', { label: ballroom.data.location, value: ballroom.data.location })
      setValue('roomTitle', ballroom.data.titleRoom)
      const floorOption = optionsFloor.find(option => option.value === ballroom?.data?.lantaiRuangan)
      setValue('floor', floorOption)
      const capacityOption = optionsCapacity.find(option => option.value === ballroom?.data?.kapasitas.toString())
      setValue('capacity', capacityOption)

      // Handle potential undefined values
      setDescriptionData(ballroom.data.deskripsi ?? '')
      setTermsData(ballroom.data.termsCondition ?? '')
      setSelectedFacility(ballroom.data.fasilitas ?? [])
    }
  }, [ballroom, setValue])

  useEffect(() => {
    const fetchImages = async () => {
      if (!ballroom?.data?.fileImages?.length) return

      const newImages: File[] = []

      for (const imageUrl of ballroom.data.fileImages) {
        try {
          const response = await fetch(`${API_FILE_CMS}${imageUrl}`)
          const blob = await response.blob()
          const filename = imageUrl.split('/').pop() ?? 'image.png'
          const file = new File([blob], filename, { type: blob.type })
          newImages.push(file)
        } catch (error) {
          // Handle error, e.g., show a toast notification
          toast.error('Failed to fetch image')
        }
      }
      setImages(newImages)
    }
    fetchImages()
  }, [ballroom])

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
        <p className="text-heading s semibold-18 mb-4">Edit Ballroom Data</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <p className="text-heading xs regular-16 w-[160px]">Aktif</p>
            <label>
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
              Title Ballroom<span className="text-red-500">*</span>
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
            <div className="w-[650px]">
              <RHFMultiSelect
                data={optionsFacility}
                name="selectedFacilities"
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
