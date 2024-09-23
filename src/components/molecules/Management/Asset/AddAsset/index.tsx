'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

import SelectForm from '@components/atoms/Form/SelectForm'
import TextForm from '@components/atoms/Form/TextForm'
import AddWithTable, { BrandData } from '@components/atoms/AddWithTable'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { apiSubmitCreateAsset } from '@services/cms/assets/api'
import ImageGallery from '@components/atoms/ImageGallery'
import { useGetLocation } from '@services/gcm/location/query'
import { OptionItem } from '@interfaces/utils'
import { IDefaultParams } from '@interfaces/api'
import { convertToBase64 } from '@utils/common'

const schema = Yup.object().shape({
  isActive: Yup.boolean().required('Aktif wajib dipilih'),
  asset: Yup.string().required('Nama asset wajib diisi'),
  location: Yup.object().required('Lokasi wajib dipilih'),
  brands: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Brand name is required'),
      stock: Yup.number().min(0, 'Stock must be non-negative'),
      isActive: Yup.boolean(),
    })
  ),
  fileImages: Yup.mixed().test('fileSize', 'File too large', (file: any) => {
    return file ? file.size <= 5 * 1024 * 1024 : true
  }),
})

export function AddAsset() {
  const router = useRouter()
  const defaultParams = { search: '', page: 1, size: 50 }
  const [params] = useState<IDefaultParams>(defaultParams)
  const [isChecked, setIsChecked] = useState(false)
  const [brands, setBrands] = useState<BrandData[]>([])
  const [images, setImages] = useState<File[]>([])
  const [optionsLocation, setOptionsLocation] = useState<OptionItem[]>([])
  const { data: locations } = useGetLocation(params)
  useEffect(() => {
    if (locations?.data) {
      const transformedOptions = locations.data
        .filter(item => item.flagActive)
        .map(item => ({ label: item.descGcm, value: item.noSr }))
      setOptionsLocation(transformedOptions)
    }
  }, [locations])
  const { handleSubmit, control, setValue, getValues } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const breadcrumbs = [
    <Link href="/management/asset" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      Booking Asset Data - Asset Data
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Add Asset Data
    </Typography>,
  ]

  useEffect(() => {
    setValue('isActive', isChecked)
  }, [isChecked])

  useEffect(() => {
    setValue('brands', brands)
  }, [brands, setValue])

  const [selectOptions, setSelectOptions] = useState([
    { value: 'Brand X', label: 'Brand X' },
    { value: 'Brand Y', label: 'Brand Y' },
    { value: 'Brand Z', label: 'Brand Z' },
  ])

  const handleAddBrand = (newBrand: BrandData) => {
    setBrands([...brands, newBrand])
  }

  const handleUpdateBrand = (updatedBrand: BrandData, index: number) => {
    const updatedBrands = [...brands]
    updatedBrands[index] = updatedBrand
    setBrands(updatedBrands)
  }

  const handleDeleteBrand = (index: number) => {
    setBrands(brands.filter((_, i) => i !== index))
  }

  const handleUpdateSelectOptions = (newOptions: { value: string; label: string }[]) => {
    setSelectOptions(newOptions)
  }

  // Function to convert files to base64

  const handleCreateAsset = async (payload: any) => {
    try {
      // Convert the first image to base64 if available
      const base64Image = images.length > 0 ? await convertToBase64(images[0]) : null

      // Prepare the request payload
      const requestPayload = {
        flagActive: payload.isActive ? 'Y' : 'N',
        assetName: payload.asset,
        lokasi: payload.location.label,
        brands: brands.map(brand => ({
          name: brand.name,
          stock: brand.stock,
          flagActive: brand.isActive ? 'Y' : 'N',
        })),
        fileImage: base64Image, // Use the converted image
      }

      // Call the API
      const response = await apiSubmitCreateAsset(requestPayload)

      // Handle response
      if (response.status === 'T') {
        toast.success('Asset berhasil dibuat!')
        router.push('/management/asset')
      } else {
        let errorMessage = 'Gagal membuat asset.'
        if (response.message) {
          errorMessage += ` ${response.message}`
        } else if (response.error && response.error.length > 0) {
          errorMessage += ` ${response.error}`
        }
        toast.error(errorMessage)
      }
    } catch (error: any) {
      // Handle errors
      if (error.response) {
        const { status, data } = error.response
        toast.error(`Error ${status}: ${data.message || 'Terjadi kesalahan server.'}`)
      } else if (error.request) {
        toast.error('Tidak ada respons dari server. Periksa koneksi internet Anda.')
      } else {
        toast.error('Terjadi kesalahan saat membuat asset.')
      }
    }
  }

  const handleImageChange = (newImages: File[]) => {
    setImages(newImages)
  }

  const onSubmit = () => {
    // Handle form submission with updated brands data
    const values = getValues()
    handleCreateAsset(values)
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
              options={optionsLocation}
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

          <div className="flex items-center mt-1">
            <div className="text-heading xs regular-16 w-[160px]">
              Image<span className="text-red-500">*</span>
              <p className="text-paragraph regular-14 mt-2">{images?.length}/1</p>
              <p className="text-paragraph regular-14 text-gray-500 ">
                Format (.png / .jpeg / .jpg) size max 5MB & ratio 2:1
              </p>
            </div>
            <div className="max-w-[600px]">
              <ImageGallery setImages={handleImageChange} images={images} maxImages={1} />
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
