'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconSpinner from '@assets/icons/IconSpinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { IOTPLoginResponse } from '@interfaces/auth'
import { IGcmCarYearCreateForm, IGcmCarYearCreatePayload } from '@interfaces/gcmCarYear'
import { mutateCreateCarYear } from '@services/gcm/carYear/mutation'
import { GetCookie } from '@store/storage'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { schema } from './schema'

export function Add() {
  const router = useRouter()

  const dataUser: IOTPLoginResponse = GetCookie('data_user')

  const {
    mutate: mutateCreate,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    reset: createReset,
  } = mutateCreateCarYear()

  const { handleSubmit, control, formState } = useForm<IGcmCarYearCreateForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const { isValid } = formState

  const onSubmit = (form: IGcmCarYearCreateForm) => {
    const payload: IGcmCarYearCreatePayload = { ...form }
    mutateCreate({ payload, idUser: dataUser?.idUser })
  }

  useEffect(() => {
    if (isCreateSuccess) {
      setTimeout(() => {
        createReset()
        router.push('/master/car-year')
      }, 3000)
    }
  }, [isCreateSuccess])

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/master/car-year')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Master Data - Manage Year</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Add Year</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Add Year</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-20">
              <p className="text-heading xs regular-16">
                Title <span className="text-red-500">*</span>
              </p>

              <Controller
                defaultValue={''}
                control={control}
                name={'descGcm'}
                render={({ field, formState: { errors } }) => (
                  <div>
                    <div className="custom-input border border-[#CCCCCC] h-[36px] w-56 px-3 flex items-center rounded-md">
                      <input
                        required
                        placeholder="Isi Title"
                        className="custom-input text-paragraph regular-14 w-full mt-1"
                        type="text"
                        {...field}
                      />
                    </div>
                    {errors?.['descGcm']?.message && (
                      <span className="text-xs text-error">{errors?.['descGcm']?.message?.toString()}</span>
                    )}
                  </div>
                )}
              ></Controller>
            </div>

            <div className="my-8" />

            <div className="flex justify-end gap-2 items-end text-heading xs regular-16">
              <button
                disabled={isCreatePending || isCreateSuccess}
                className={`${
                  isCreatePending || isCreateSuccess ? 'opacity-50' : ''
                } bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-xl`}
                type="button"
                onClick={() => router.push('/master/car-year')}
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
