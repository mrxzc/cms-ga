'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconSpinner from '@assets/icons/IconSpinner'
import ImageGallery from '@components/atoms/ImageGallery'
import { yupResolver } from '@hookform/resolvers/yup'
import { IOTPLoginResponse } from '@interfaces/auth'
import { ICalendarEventCreateForm, ICalendarEventCreatePayload } from '@interfaces/calendarEvent'
import { useMutateCreateCalendarEvent, useMutateUploadImageCalendarEvent } from '@services/calendarEvent/mutation'
import { GetCookie } from '@store/storage'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { schema } from './schema'

const ReusableCKEditor = dynamic(() => import('@/components/atoms/ReuseableCKEditor'), { ssr: false })

export function Add() {
  const router = useRouter()

  const dataUser: IOTPLoginResponse = GetCookie('data_user')

  const {
    mutate: mutateCreate,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    reset: createReset,
  } = useMutateCreateCalendarEvent()

  const { data: uploadImageData, mutate: mutateUpload, reset: uploadReset } = useMutateUploadImageCalendarEvent()

  const { handleSubmit, control, formState, setValue } = useForm<ICalendarEventCreateForm>({
    defaultValues: {
      description: '',
      flagActive: false,
      flagShow: false,
    },
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const { isValid } = formState

  const onSubmit = (form: ICalendarEventCreateForm) => {
    const payload: ICalendarEventCreatePayload = { ...form }
    mutateCreate({ payload, idUser: dataUser?.idUser })
  }

  useEffect(() => {
    if (isCreateSuccess) {
      setTimeout(() => {
        createReset()
        router.push('/calendar-event')
      }, 3000)
    }
  }, [isCreateSuccess])

  useEffect(() => {
    if (uploadImageData?.data) {
      setValue('image', uploadImageData?.data, { shouldValidate: true })
      uploadReset()
    }
  }, [uploadImageData?.data])

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/calendar-event')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Calendar of Event</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Add Calendar of Event</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Add Calendar of Event</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <p className="text-heading xs regular-16">Aktif</p>

              <div className="col-span-3 relative">
                <label className="switch">
                  <input
                    name={`flag-active`}
                    type="checkbox"
                    onChange={val => {
                      setValue('flagActive', val?.target?.checked)
                    }}
                  />
                  <span className="slider green round"></span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <p className="text-heading xs regular-16">Banner</p>

              <div className="col-span-3 relative">
                <div className="flex items-center space-x-3">
                  <label className="switch">
                    <input
                      name={`flag-show`}
                      type="checkbox"
                      onChange={val => {
                        setValue('flagShow', val?.target?.checked)
                      }}
                    />
                    <span className="slider green round"></span>
                  </label>
                  <div className="text-heading xs regular-16">0/5</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <p className="text-heading xs regular-16">
                Title <span className="text-red-500">*</span>
              </p>

              <Controller
                defaultValue={''}
                control={control}
                name={'title'}
                render={({ field, formState: { errors } }) => (
                  <div className="col-span-3">
                    <div className="custom-input border border-[#CCCCCC] h-[36px] w-80 px-3 flex items-center rounded-md">
                      <input
                        required
                        placeholder="Isi Title"
                        className="custom-input text-paragraph regular-14 w-full mt-1"
                        type="text"
                        {...field}
                      />
                    </div>
                    {errors?.['title']?.message && (
                      <span className="text-xs text-error">{errors?.['title']?.message?.toString()}</span>
                    )}
                  </div>
                )}
              ></Controller>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <p className="text-heading xs regular-16">Description</p>
              <div className="col-span-3">
                <ReusableCKEditor
                  config={{
                    placeholder: 'Isi deskripsi',
                  }}
                  onChange={content => {
                    setValue('description', content)
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-heading xs regular-16 mb-1">
                  Image<span className="text-red-500">*</span>
                </p>
                <p className="text-extra-small regular-12 text-[#909090]">
                  Format (.png / .jpeg / .jpg) size max 5MB & ratio 2:1
                </p>
              </div>

              <div className="col-span-3">
                <div className="max-w-[600px]">
                  <ImageGallery
                    setImages={images => {
                      if (images?.length) {
                        const formData: FormData = new FormData()
                        formData.append('noIdInfo', '')
                        formData.append('file', images[0])
                        mutateUpload({ payload: formData, idUser: dataUser?.idUser })
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="my-8" />

            <div className="flex justify-end gap-2 items-end text-heading xs regular-16">
              <button
                disabled={isCreatePending || isCreateSuccess}
                className={`${
                  isCreatePending || isCreateSuccess ? 'opacity-50' : ''
                } bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-xl`}
                type="button"
                onClick={() => router.push('/calendar-event')}
              >
                Cancel
              </button>
              <button
                disabled={isCreatePending || isCreateSuccess}
                className={`${
                  isCreatePending || !isValid || isCreateSuccess ? 'opacity-50' : ''
                } bg-[#235696] text-[#e5f2fc] max-w-[145px] max-h-[45px] px-12 py-3 rounded-xl flex items-center justify-center`}
                type="submit"
              >
                {isCreatePending && <IconSpinner className="animate-spin" />}
                {!isCreatePending && 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
