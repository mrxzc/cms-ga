'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import * as Yup from 'yup'

import SelectForm from '@components/atoms/Form/SelectForm'
import TextForm from '@components/atoms/Form/TextForm'
import AddWithTable, { BrandData } from '@components/atoms/AddWithTable'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { apiSubmitUpdateAsset, apiUploadImageAsset } from '@services/cms/assets/api'
import { useGetAssetDetail } from '@services/cms/assets/query'
import { IAssetDetailParams, Ibrand } from '@interfaces/assets'
import ImageGallery from '@components/atoms/ImageGallery'
import { API_FILE_CMS } from '@utils/environment'

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
})

export function EditAsset() {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)
  const [brands, setBrands] = useState<BrandData[]>([])
  const [images, setImages] = useState<File[]>([])

  const [initialDataLoaded, setInitialDataLoaded] = useState(false)
  const [param, setParam] = useState<IAssetDetailParams>({
    noIdAsset: '',
  })

  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  const { data: assets } = useGetAssetDetail(param)

  const { handleSubmit, control, setValue, getValues, watch } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  useEffect(() => {
    if (slug) {
      setParam({ noIdAsset: slug })
    }
  }, [])

  useEffect(() => {
    if (assets?.data && !initialDataLoaded) {
      setValue('isActive', assets.data.flagActive === 'Y')
      setInitialDataLoaded(true)
    }
    setIsChecked(assets?.data?.flagActive === 'Y')
  }, [assets])

  useEffect(() => {
    if (assets?.data) {
      setValue('isActive', assets.data.flagActive === 'Y')
      setValue('location', { label: assets.data.lokasi, value: assets.data.lokasi })
      setValue('asset', assets.data.assetName)

      // Handle potential undefined values
      setBrands(
        assets.data.brands?.map((brand: Ibrand) => ({
          ...brand,
          isActive: true,
        })) ?? []
      )
    }
  }, [assets, setValue])

  const options = [
    { label: 'Head Office', value: 'ACC' },
    { label: 'Berijalan', value: 'BERIJALAN' },
  ]

  const breadcrumbs = [
    <Link href="/management/asset" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      Booking Asset Data - Asset Data
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Edit Asset Data
    </Typography>,
  ]

  useEffect(() => {
    setValue('isActive', isChecked)
  }, [isChecked, watch('isActive')])

  useEffect(() => {
    setValue('brands', brands)
  }, [brands, setValue])

  useEffect(() => {
    const fetchImages = async () => {
      if (!assets?.data?.pathImage) return

      const newImages: File[] = []

      try {
        const response = await fetch(`${API_FILE_CMS}${assets?.data?.pathImage}`)
        const blob = await response.blob()
        const filename = assets?.data?.pathImage.split('/').pop() ?? 'image.png'
        const file = new File([blob], filename, { type: blob.type })
        newImages.push(file)
      } catch (error) {
        // Handle error, e.g., show a toast notification
        toast.error('Failed to fetch image')
      }
      // for (const imageUrl of assets.data.pathImage) {
      // }
      setImages(newImages)
    }
    fetchImages()
  }, [assets])

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

  const handleImageChange = (newImages: File[]) => {
    setImages(newImages)
  }

  const handleUpdateSelectOptions = (newOptions: { value: string; label: string }[]) => {
    setSelectOptions(newOptions)
  }

  const handleUploadImageAsset = async (): Promise<boolean> => {
    try {
      const formData: FormData = new FormData()
      if (slug) {
        formData.append('noIdAsset', slug)
      }
      if (images && images.length > 0) {
        for (const image of images) {
          formData.append('fileImage', image)
        }
      }

      const response = await apiUploadImageAsset(formData)
      if (response.status === 'T') {
        toast.success('Gambar asset berhasil diubah!')
        return true
      } else {
        let errorMessage = 'Gagal mengubah gambar asset.'
        if (response.message) {
          errorMessage += ` ${response.message}`
        } else if (response.error && response.error.length > 0) {
          errorMessage += ` ${response.error}`
        }
        toast.error(errorMessage)
        return false
      }
    } catch (error: any) {
      let errorMessage = 'Terjadi kesalahan saat mengunggah gambar.'
      if (error.response) {
        const { status, data } = error.response
        errorMessage = `Error ${status}: ${data.message || 'Terjadi kesalahan server saat mengunggah gambar.'}`
      } else if (error.request) {
        errorMessage = 'Tidak ada respons dari server saat mengunggah gambar. Periksa koneksi internet Anda.'
      }
      toast.error(errorMessage)
      return false
    }
  }

  const handleCreateAsset = async (payload: any) => {
    try {
      const requestPayload: any = {
        noIdAsset: slug,
        flagActive: payload.isActive ? 'Y' : 'N',
        assetName: payload.asset,
        lokasi: payload.location.value,
        brands: brands.map(brand => ({
          name: brand.name,
          stock: brand.stock,
          flagActive: brand.isActive ? 'Y' : 'N',
        })),
      }

      const response = await apiSubmitUpdateAsset(requestPayload)

      if (response.status === 'T') {
        toast.success('Asset berhasil diperbaharui!')

        // Upload gambar
        const imageUploadSuccess = await handleUploadImageAsset()

        if (imageUploadSuccess) {
          // Redirect ke halaman utama hanya jika update asset dan upload gambar berhasil
          router.push('/management/asset')
        } else {
          toast.warning('Asset berhasil diperbaharui, tetapi terjadi masalah saat mengunggah gambar.')
        }
      } else {
        let errorMessage = 'Gagal memperbaharui asset.'
        if (response.message) {
          errorMessage += ` ${response.message}`
        } else if (response.error && response.error.length > 0) {
          errorMessage += ` ${response.error}`
        }
        toast.error(errorMessage)
      }
    } catch (error: any) {
      let errorMessage = 'Terjadi kesalahan saat memperbaharui asset.'
      if (error.response) {
        const { status, data } = error.response
        errorMessage = `Error ${status}: ${data.message || 'Terjadi kesalahan server.'}`
      } else if (error.request) {
        errorMessage = 'Tidak ada respons dari server. Periksa koneksi internet Anda.'
      }
      toast.error(errorMessage)
    }
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
        <p className="text-heading s semibold-18 mb-4">Edit Asset Data</p>
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
