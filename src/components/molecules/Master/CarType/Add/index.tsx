'use client'

import IconChevronBottom from '@assets/icons/IconChevronBottom'
import IconChevronRight from '@assets/icons/IconChevronRight'
import IconSpinner from '@assets/icons/IconSpinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { IGcmCarBrand } from '@interfaces/gcmCarBrand'
import { IGcmCarTypeCreateForm, IGcmCarTypeCreatePayload, IGcmCarTypeListParams } from '@interfaces/gcmCarType'
import { useGetCarBrand } from '@services/gcm/carBrand/query'
import { useMutateCreateCarType } from '@services/gcm/carType/mutation'
import { dummiesArray } from '@utils/common'
import { debounce } from 'lodash'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { schema } from './schema'

export function Add() {
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>()
  const [keywords, setKeywords] = useState<string>()

  const defaultParams = {
    search: '',
    page: 1,
    size: 10,
  }

  const [params, setParams] = useState<IGcmCarTypeListParams>(defaultParams)

  const { data, isFetching } = useGetCarBrand(params)

  const {
    mutate: mutateCreate,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    reset: createReset,
  } = useMutateCreateCarType()

  const { handleSubmit, control, formState, watch, setValue } = useForm<IGcmCarTypeCreateForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const { isValid } = formState

  const onSubmit = (form: IGcmCarTypeCreateForm) => {
    const payload: IGcmCarTypeCreatePayload = { ...form }
    mutateCreate({ payload })
  }

  const handleSearch = useCallback(
    debounce(input => {
      setParams({ page: 1, size: 10, search: input })
    }, 500),
    []
  )

  useEffect(() => {
    if (isCreateSuccess) {
      setTimeout(() => {
        createReset()
        router.push('/master/car-type')
      }, 3000)
    }
  }, [isCreateSuccess])

  useEffect(() => {
    const handleClick = (event: any) => {
      if (!containerRef?.current?.contains(event?.target)) {
        setIsDropdownOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isDropdownOpen])

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/master/car-type')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Master Data - Manage Tipe Mobil</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Add Tipe Mobil</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Add Tipe Mobil</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <p className="text-heading xs regular-16">
                Brand <span className="text-red-500">*</span>
              </p>

              <Controller
                control={control}
                name={'carBrand.noSr'}
                render={({ formState: { errors } }) => (
                  <div className="col-span-3 relative">
                    <div
                      ref={containerRef}
                      onKeyDown={() => {}}
                      role="button"
                      onClick={() => {
                        setIsDropdownOpen(true)
                      }}
                      className="hover:cursor-pointer custom-input border border-[#CCCCCC] h-[36px] w-80 px-3 flex items-center rounded-md relative"
                    >
                      <input
                        required
                        placeholder="Pilih brand"
                        className="custom-input text-paragraph regular-14 w-full mt-1 flex-1"
                        type="text"
                        value={keywords ?? ''}
                        onChange={e => {
                          setKeywords(e?.target?.value)
                          handleSearch(e?.target?.value)
                        }}
                      />
                      <IconChevronBottom
                        width={21}
                        height={21}
                        className={`${isDropdownOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}
                      ></IconChevronBottom>
                      <div
                        className={`${
                          isDropdownOpen ? 'absolute' : 'hidden'
                        } left-0 top-10 w-full border border-[#CCCCCC] bg-white py-2 rounded-md max-h-40 overflow-y-auto`}
                      >
                        {isFetching && (
                          <>
                            <div className="animate-pulse px-2">
                              {dummiesArray().map(val => (
                                <div key={`loading-${val}`} className="w-full h-6 bg-gray-200 mb-2"></div>
                              ))}
                            </div>
                          </>
                        )}
                        {!isFetching &&
                          data?.data?.map((brand: IGcmCarBrand) => (
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation()
                                setValue('carBrand', { descGcm: brand?.descGcm, noSr: brand?.noSr })
                                setKeywords(brand?.descGcm)
                                setIsDropdownOpen(false)
                              }}
                              key={`brand-${brand?.noSr}`}
                              className={`block w-full text-left  text-paragraph ${
                                watch('carBrand.noSr') == brand?.noSr ? 'semibold-14 bg-[#F5FAFF]' : 'regular-14'
                              }  py-1 px-2 mb-1 hover:semibold-14 hover:bg-[#F5FAFF]`}
                            >
                              {brand?.descGcm}
                            </button>
                          ))}
                      </div>
                    </div>

                    {errors?.['carBrand']?.message && (
                      <span className="text-xs text-error">{errors?.['carBrand']?.message?.toString()}</span>
                    )}
                  </div>
                )}
              ></Controller>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <p className="text-heading xs regular-16">
                Title <span className="text-red-500">*</span>
              </p>

              <Controller
                defaultValue={''}
                control={control}
                name={'descGcm'}
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
                    {errors?.['descGcm']?.message && (
                      <span className="text-xs text-error">{errors?.['descGcm']?.message?.toString()}</span>
                    )}
                  </div>
                )}
              ></Controller>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <p className="text-heading xs regular-16">
                Kapasitas Mobil <span className="text-red-500">*</span>
              </p>

              <Controller
                control={control}
                name={'capacity'}
                render={({ field, formState: { errors } }) => (
                  <div className="col-span-3">
                    <div className="custom-input border border-[#CCCCCC] h-[36px] w-80 px-3 flex items-center rounded-md overflow-hidden">
                      <input
                        required
                        placeholder="Isi kapasitas"
                        className="custom-input text-paragraph regular-14 w-full mt-1 flex-1 pr-2"
                        type="number"
                        {...field}
                      />
                      <div className="border-l border-[#CCCCCC] pl-2 py-2 h-full text-paragraph regular-14 text-[#0C0C0C]">
                        Orang
                      </div>
                    </div>
                    {errors?.['capacity']?.message && (
                      <span className="text-xs text-error">{errors?.['capacity']?.message?.toString()}</span>
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
                onClick={() => router.push('/master/car-type')}
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
