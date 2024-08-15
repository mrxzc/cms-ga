'use client'

import React, { useState, ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'

import IconPlus from '@assets/icons/IconPlus'
import images from '@assets/images'

interface ImageCardProps {
  file: File
  isMain: boolean
  onClose?: () => void
}

const ImageCard: React.FC<ImageCardProps> = ({ file, isMain, onClose }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = e => {
      setImageUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [file])

  return (
    <div className="relative flex flex-col items-center justify-center rounded-lg shadow-md w-[125px] h-[125px] mr-2">
      {imageUrl && (
        <Image
          width={125}
          height={125}
          src={imageUrl}
          alt="Gambar Ruangan"
          className="w-[125px] h-[125px] object-cover"
        />
      )}
      {isMain && (
        <p className="absolute top-2 left-2 bg-gray-200 px-2 py-1 rounded-md text-extra-small regular-12 border border-[#4c1eff] text-[#4c1eff]">
          Foto Utama
        </p>
      )}

      <Image
        src={images.ERASE_IMAGE}
        width={12}
        height={12}
        alt="Delete Icon"
        className="hover:cursor-pointer absolute top-2 right-2"
        onClick={onClose}
      />
    </div>
  )
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<File[]>([])

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)
        if (file) {
          const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
          const maxSizeInBytes = 5 * 1024 * 1024 // 5MB

          if (!allowedTypes.includes(file.type)) {
            toast.error('Format file harus .png, .jpeg, atau .jpg')
            return
          }

          if (file.size > maxSizeInBytes) {
            toast.error('Ukuran file maksimal 5MB')
            return
          }

          setImages(prevImages => [...prevImages, file])
        }
      }
    }
  }

  const handleCloseImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-5 gap-4 mb-4 w-[650px]">
        {images.slice(0, 10).map((image, index) => (
          <ImageCard key={index} file={image} isMain={index === 0} onClose={() => handleCloseImage(index)} />
        ))}
      </div>
      {images.length < 10 && (
        <div className="flex gap-2 items-center">
          <label htmlFor="fileInput" className="cursor-pointer">
            <div
              className="border border-[#d5d5d5] rounded grid place-items-center w-[125px] h-[125px] items-center justify-left bg-[#f9f8ff]"
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              <IconPlus width={52} height={52} color="#505050" />
            </div>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/png, image/jpeg, image/jpg"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />
          <p className="mt-2 text-center w-[175px]">Format (.png / .jpeg / .jpg ) size max 5MB & ratio 2:1</p>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
