'use client'

import IconChevronRight from '@assets/icons/IconChevronRight'
import IconSpinner from '@assets/icons/IconSpinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { IOTPLoginResponse } from '@interfaces/auth'
import { IGcmRoomFloorUpdateForm, IGcmRoomFloorUpdatePayload } from '@interfaces/gcmRoomFloor'
import { mutateUpdateRoomFloor } from '@services/gcm/roomFloor/mutation'
import { useGetRoomFloorDetail } from '@services/gcm/roomFloor/query'
import { GetCookie } from '@store/storage'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { schema } from './schema'

export function Edit() {
  const router = useRouter()

  const dataUser: IOTPLoginResponse = GetCookie('data_user')

  const paramsPage = useParams<{ roomFloor: string }>()

  const {
    data,
    isFetching,
    isRefetching,
    isSuccess: isFetchSuccess,
    isError: isFetchError,
    isRefetchError,
    refetch,
  } = useGetRoomFloorDetail({ noSr: paramsPage?.roomFloor }, dataUser?.idUser)

  const {
    mutate: mutateUpdate,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    reset: updateReset,
  } = mutateUpdateRoomFloor()

  const { handleSubmit, control, formState, reset } = useForm<IGcmRoomFloorUpdateForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const { isValid } = formState

  const onSubmit = (form: IGcmRoomFloorUpdateForm) => {
    const payload: IGcmRoomFloorUpdatePayload = { ...form }
    mutateUpdate({ payload, idUser: dataUser?.idUser })
  }

  useEffect(() => {
    if (isUpdateSuccess) {
      setTimeout(() => {
        updateReset()
        router.push('/master/room-floor')
      }, 3000)
    }
  }, [isUpdateSuccess])

  useEffect(() => {
    if (isFetchSuccess && data?.data) {
      reset({ descGcm: data?.data?.descGcm, noSr: data?.data?.noSr })
    }
  }, [isFetchSuccess])

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/master/room-floor')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Master Data - Manage Lantai Ruangan</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Edit Lantai Ruangan</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Edit Lantai Ruangan</p>

          {(isFetching || isRefetching) && (
            <div className="flex items-center justify-center my-20">
              <IconSpinner width={100} height={100} className="animate-spin"></IconSpinner>
            </div>
          )}

          {(isFetchError || isRefetchError) && (
            <div className="w-full flex flex-col justify-center items-center my-20">
              <div className="text-heading s semibold-18 mb-2">Tidak ada data</div>
              <div className="text-extra-small regular-12 mb-4">Saat ini belum ada yang tersedia</div>
              <button
                onClick={() => {
                  refetch()
                }}
                type="button"
                className="next-button h-8 px-4 rounded-lg w-auto text-extra-small semibold-12 text-[#FFFFFF] flex items-center justify-center"
              >
                Reload
              </button>
            </div>
          )}

          {isFetchSuccess && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex space-x-20">
                <p className="text-heading xs regular-16">
                  Title <span className="text-red-500">*</span>
                </p>

                <Controller
                  disabled={!isFetchSuccess}
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
                  disabled={isUpdatePending || isUpdateSuccess}
                  className={`${
                    isUpdatePending || isUpdateSuccess ? 'opacity-50' : ''
                  } bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-xl`}
                  type="button"
                  onClick={() => router.push('/master/room-floor')}
                >
                  Cancel
                </button>
                <button
                  disabled={isUpdatePending || isUpdateSuccess}
                  className={`${
                    isUpdatePending || !isValid || isUpdateSuccess ? 'opacity-50' : ''
                  } bg-[#235696] text-[#e5f2fc] max-w-[145px] max-h-[45px] px-12 py-3 rounded-xl flex items-center justify-center`}
                  type="submit"
                >
                  {isUpdatePending && <IconSpinner className="animate-spin" />}
                  {!isUpdatePending && 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
