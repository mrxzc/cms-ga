'use client'

import { Breadcrumbs, Stack } from '@mui/material'
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from '@mui/material/Link'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import DurationInput from '@components/atoms/DurationInput'

const schema = Yup.object().shape({
  durationRoom: Yup.object()
    .shape({
      days: Yup.number().min(0, 'Durasi hari tidak boleh negatif').required('Durasi hari wajib diisi'),
      hours: Yup.number().min(0, 'Durasi jam tidak boleh negatif').required('Durasi jam wajib diisi'),
      minutes: Yup.number().min(0, 'Durasi menit tidak boleh negatif').required('Durasi menit wajib diisi'),
    })
    .required('Durasi Pinjam Max Room wajib diisi'),

  durationVehicle: Yup.object()
    .shape({
      days: Yup.number().min(0, 'Durasi hari tidak boleh negatif').required('Durasi hari wajib diisi'),
      hours: Yup.number().min(0, 'Durasi jam tidak boleh negatif').required('Durasi jam wajib diisi'),
      minutes: Yup.number().min(0, 'Durasi menit tidak boleh negatif').required('Durasi menit wajib diisi'),
    })
    .required('Durasi Pinjam Max Vehicle wajib diisi'),

  slaForm: Yup.object()
    .shape({
      days: Yup.number().min(0, 'Durasi hari tidak boleh negatif').required('Durasi hari wajib diisi'),
      hours: Yup.number().min(0, 'Durasi jam tidak boleh negatif').required('Durasi jam wajib diisi'),
      minutes: Yup.number().min(0, 'Durasi menit tidak boleh negatif').required('Durasi menit wajib diisi'),
    })
    .required('SLA Form wajib diisi'),

  durationAsset: Yup.object()
    .shape({
      days: Yup.number().min(0, 'Durasi hari tidak boleh negatif').required('Durasi hari wajib diisi'),
      hours: Yup.number().min(0, 'Durasi jam tidak boleh negatif').required('Durasi jam wajib diisi'),
      minutes: Yup.number().min(0, 'Durasi menit tidak boleh negatif').required('Durasi menit wajib diisi'),
    })
    .required('Durasi Pinjam Max Asset wajib diisi'),

  durationManpower: Yup.object()
    .shape({
      days: Yup.number().min(0, 'Durasi hari tidak boleh negatif').required('Durasi hari wajib diisi'),
      hours: Yup.number().min(0, 'Durasi jam tidak boleh negatif').required('Durasi jam wajib diisi'),
      minutes: Yup.number().min(0, 'Durasi menit tidak boleh negatif').required('Durasi menit wajib diisi'),
    })
    .required('Durasi Pinjam Max Manpower wajib diisi'),
})

export function TimeLimit() {
  const router = useRouter()

  const breadcrumbs = [
    <Link underline="none" color="#000000" href="/management/vehicle" key="1" className="text-extra-small regular-12">
      Booking Asset Data - Time Limit Management
    </Link>,
  ]

  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = () => {}

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-full w-full overflow-auto">
      <div className="bg-white px-4 py-4 rounded-xl mb-4 text-[#235696] flex justify-between">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading xs semibold-16 mb-4">Time Limit Management</p>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <section className="mb-6">
              <h2 className="text-heading xs semibold-16 mb-2">Duration Room</h2>
              <div className="flex items-center">
                <label htmlFor="durationRoom" className="mr-2 min-w-[250px]">
                  Durasi Pinjam Max Room
                </label>
                <DurationInput name="durationRoom" control={methods.control} />
              </div>
            </section>
            <section className="mb-6">
              <h2 className="text-heading xs semibold-16 mb-2">Duration Vehicle</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <label htmlFor="durationVehicle" className="mr-2 min-w-[250px]">
                    Durasi Pinjam Max Vehicle
                  </label>
                  <DurationInput name="durationVehicle" control={methods.control} />
                </div>

                <div className="flex items-center">
                  <label htmlFor="slaForm" className="mr-2 min-w-[250px]">
                    SLA Form
                  </label>
                  <DurationInput name="slaForm" control={methods.control} />
                </div>
              </div>
            </section>
            <section className="mb-6">
              <h2 className="text-heading xs semibold-16 mb-2">Duration Asset</h2>
              <div className="flex items-center">
                <label htmlFor="durationAsset" className="mr-2 min-w-[250px]">
                  Durasi Pinjam Max Asset
                </label>
                <DurationInput name="durationAsset" control={methods.control} />
              </div>
            </section>
            <section className="mb-6">
              <h2 className="text-heading xs semibold-16 mb-2">Duration Manpower</h2>
              <div className="flex items-center">
                <label htmlFor="durationManpower" className="mr-2 min-w-[250px]">
                  Durasi Pinjam Max Manpower
                </label>
                <DurationInput name="durationManpower" control={methods.control} />
              </div>
            </section>
            <div className="divider" />
            <div className="flex justify-end gap-2 items-end">
              <button
                className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
                type="button"
                onClick={() => router.push('/management/vehicle')}
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
        </FormProvider>
      </div>
    </div>
  )
}
