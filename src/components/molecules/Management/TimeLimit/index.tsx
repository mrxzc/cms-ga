'use client'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from '@mui/material/Link'
import React, { useEffect } from 'react'
import { Breadcrumbs, Stack, Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import DurationInput from '@components/atoms/DurationInput'
import { useGetTimeLimit } from '@services/timelimit/query'
import { useCreateTimeLimit, useUpdateTimeLimit } from '@services/timelimit/mutation'
import { IPayloadCreateTimeLimit, IPayloadUpdateTimeLimit } from '@interfaces/time-limit'
import { toast } from 'react-toastify'

// Define the shape of the duration object
interface Duration {
  days: number
  hours: number
  minutes: number
}

// Define the shape of the form data
interface FormData {
  durationRoom: Duration
  durationBallroom: Duration
  durationKaraoke: Duration
  durationVehicle: Duration
  slaForm: Duration
  durationAsset: Duration
  durationManpower: Duration
}

// Define a mapping between categories and form data keys
const categoryToFormKey: Record<string, keyof FormData> = {
  Room: 'durationRoom',
  Ballroom: 'durationBallroom',
  Karaoke: 'durationKaraoke',
  Vehicle: 'durationVehicle',
  Asset: 'durationAsset',
  Manpower: 'durationManpower',
}

const schema = Yup.object().shape({
  durationRoom: Yup.object()
    .shape({
      days: Yup.number().min(0, 'Durasi hari tidak boleh negatif').required('Durasi hari wajib diisi'),
      hours: Yup.number().min(0, 'Durasi jam tidak boleh negatif').required('Durasi jam wajib diisi'),
      minutes: Yup.number().min(0, 'Durasi menit tidak boleh negatif').required('Durasi menit wajib diisi'),
    })
    .required('Durasi Pinjam Max Room wajib diisi'),

  durationBallroom: Yup.object()
    .shape({
      days: Yup.number().min(0, 'Durasi hari tidak boleh negatif').required('Durasi hari wajib diisi'),
      hours: Yup.number().min(0, 'Durasi jam tidak boleh negatif').required('Durasi jam wajib diisi'),
      minutes: Yup.number().min(0, 'Durasi menit tidak boleh negatif').required('Durasi menit wajib diisi'),
    })
    .required('Durasi Pinjam Max Ballroom wajib diisi'),

  durationKaraoke: Yup.object()
    .shape({
      days: Yup.number().min(0, 'Durasi hari tidak boleh negatif').required('Durasi hari wajib diisi'),
      hours: Yup.number().min(0, 'Durasi jam tidak boleh negatif').required('Durasi jam wajib diisi'),
      minutes: Yup.number().min(0, 'Durasi menit tidak boleh negatif').required('Durasi menit wajib diisi'),
    })
    .required('Durasi Pinjam Max Karaoke wajib diisi'),

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

  const { data: timeLimit, refetch } = useGetTimeLimit({ page: 1, size: 10 })

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      durationRoom: { days: 0, hours: 0, minutes: 0 },
      durationBallroom: { days: 0, hours: 0, minutes: 0 },
      durationKaraoke: { days: 0, hours: 0, minutes: 0 },
      durationVehicle: { days: 0, hours: 0, minutes: 0 },
      slaForm: { days: 0, hours: 0, minutes: 0 },
      durationAsset: { days: 0, hours: 0, minutes: 0 },
      durationManpower: { days: 0, hours: 0, minutes: 0 },
    },
  })

  const breadcrumbs = [
    <Link underline="none" color="#000000" href="/management/vehicle" key="1" className="text-extra-small regular-12">
      Booking Asset Data - Time Limit Management
    </Link>,
  ]

  useEffect(() => {
    if (timeLimit?.data) {
      const newValues: Partial<FormData> = {}
      timeLimit.data.forEach(item => {
        switch (item.category) {
          case 'Room':
            newValues.durationRoom = item.duration
            break
          case 'Ballroom':
            newValues.durationBallroom = item.duration
            break
          case 'Karaoke':
            newValues.durationKaraoke = item.duration
            break
          case 'Vehicle':
            newValues.durationVehicle = item.duration
            newValues.slaForm = item.slaForm ? item.slaForm : { days: 0, hours: 0, minutes: 0 }
            break
          case 'Asset':
            newValues.durationAsset = item.duration
            break
          case 'Manpower':
            newValues.durationManpower = item.duration
            break
        }
      })
      methods.reset(newValues as FormData)
    }
  }, [timeLimit?.data, methods])

  const createTimeLimitMutation = useCreateTimeLimit()
  const updateTimeLimitMutation = useUpdateTimeLimit()

  const onSubmit = (data: FormData) => {
    if (timeLimit?.data && timeLimit.data.length > 0) {
      // If timeLimit data exists, use update mutation
      const updatePayload: IPayloadUpdateTimeLimit = {
        items: timeLimit.data.map(item => {
          const formKey = categoryToFormKey[item.category]
          if (!formKey) {
            throw new Error(`Invalid category: ${item.category}`)
          }

          // Ensure SLA is defined, default to { days: 0, hours: 0, minutes: 0 } if not present
          const sla = item.category === 'Vehicle' && data.slaForm ? data.slaForm : { days: 0, hours: 0, minutes: 0 }

          return {
            timeLimitId: item.id,
            category: item.category,
            duration: data[formKey],
            sla: sla,
          }
        }),
      }

      updateTimeLimitMutation.mutate(updatePayload, {
        onSuccess: () => {
          toast.success('Time limit updated successfully!')
          refetch()
          // Handle success (e.g., show a success message, redirect, etc.)
        },
        onError: () => {
          toast.error('Error updating time limit!!!')
          refetch()
          // Handle error (e.g., show an error message)
        },
      })
    } else {
      // If no timeLimit data exists, use create mutation
      const createPayload: IPayloadCreateTimeLimit = {
        items: [
          {
            category: 'Room',
            duration: data.durationRoom,
            sla: { days: 0, hours: 0, minutes: 0 },
          },
          {
            category: 'Ballroom',
            duration: data.durationBallroom,
            sla: { days: 0, hours: 0, minutes: 0 },
          },
          {
            category: 'Karaoke',
            duration: data.durationKaraoke,
            sla: { days: 0, hours: 0, minutes: 0 },
          },
          {
            category: 'Vehicle',
            duration: data.durationVehicle,
            sla: data.slaForm,
          },
          {
            category: 'Asset',
            duration: data.durationAsset,
            sla: { days: 0, hours: 0, minutes: 0 },
          },
          {
            category: 'Manpower',
            duration: data.durationManpower,
            sla: { days: 0, hours: 0, minutes: 0 },
          },
        ],
      }

      createTimeLimitMutation.mutate(createPayload, {
        onSuccess: () => {
          toast.success('Time limit created successfully!')
          refetch()
          // Handle success (e.g., show a success message, redirect, etc.)
        },
        onError: () => {
          toast.error('Error creating time limit!!!')
          refetch()
          // Handle error (e.g., show an error message)
        },
      })
    }
  }

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
            {/* Input Room */}
            <section className="mb-6">
              <div className="flex gap-2 items-center flex-row">
                <h2 className="text-heading xs semibold-16">Duration Room</h2>
                <Tooltip
                  title="Pengaturan untuk berapa lama ruangan bisa dibooking oleh pengguna."
                  className="flex items-center bg-[#424242] "
                >
                  <p className="text-[white] ml-1 rounded-full px-1 py-1 bg-[#424242] w-[16px] h-[16px] flex items-center justify-center text-center text-[12px]">
                    i
                  </p>
                </Tooltip>
              </div>
              <div className="flex items-center">
                <label htmlFor="durationRoom" className="mr-2 min-w-[250px]">
                  Durasi Pinjam Max Room
                </label>
                <DurationInput name="durationRoom" control={methods.control} />
              </div>
            </section>

            {/* Input Ballroom */}
            <section className="mb-6">
              <div className="flex gap-2 items-center flex-row">
                <h2 className="text-heading xs semibold-16">Duration Ballroom</h2>
                <Tooltip
                  title="Atur durasi maksimal peminjaman ballroom disini."
                  className="flex items-center bg-[#424242] "
                >
                  <p className="text-[white] ml-1 rounded-full px-1 py-1 bg-[#424242] w-[16px] h-[16px] flex items-center justify-center text-center text-[12px]">
                    i
                  </p>
                </Tooltip>
              </div>
              <div className="flex items-center">
                <label htmlFor="durationBallroom" className="mr-2 min-w-[250px]">
                  Durasi Pinjam Max Ballroom
                </label>
                <DurationInput name="durationBallroom" control={methods.control} />
              </div>
            </section>

            {/* Input Karaoke */}
            <section className="mb-6">
              <div className="flex gap-2 items-center flex-row">
                <h2 className="text-heading xs semibold-16">Duration Karaoke</h2>
                <Tooltip
                  title="Atur durasi maksimal peminjaman karaoke disini."
                  className="flex items-center bg-[#424242] "
                >
                  <p className="text-[white] ml-1 rounded-full px-1 py-1 bg-[#424242] w-[16px] h-[16px] flex items-center justify-center text-center text-[12px]">
                    i
                  </p>
                </Tooltip>
              </div>
              <div className="flex items-center">
                <label htmlFor="duration" className="mr-2 min-w-[250px]">
                  Durasi Pinjam Max Karaoke
                </label>
                <DurationInput name="durationKaraoke" control={methods.control} />
              </div>
            </section>

            {/* Input Vehicle */}
            <section className="mb-6">
              <div className="flex gap-2 items-center flex-row">
                <h2 className="text-heading xs semibold-16">Duration Vehicle</h2>
                <Tooltip
                  title="Atur durasi maksimal peminjaman dan form kendaraan di sini."
                  className="flex items-center bg-[#424242] "
                >
                  <p className="text-[white] ml-1 rounded-full px-1 py-1 bg-[#424242] w-[16px] h-[16px] flex items-center justify-center text-center text-[12px]">
                    i
                  </p>
                </Tooltip>
              </div>
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

            {/* Input Asset */}
            <section className="mb-6">
              <div className="flex gap-2 items-center flex-row">
                <h2 className="text-heading xs semibold-16">Duration Asset</h2>
                <Tooltip
                  title="Pengaturan untuk berapa lama asset bisa dibooking oleh pengguna."
                  className="flex items-center bg-[#424242] "
                >
                  <p className="text-[white] ml-1 rounded-full px-1 py-1 bg-[#424242] w-[16px] h-[16px] flex items-center justify-center text-center text-[12px]">
                    i
                  </p>
                </Tooltip>
              </div>
              <div className="flex items-center">
                <label htmlFor="durationAsset" className="mr-2 min-w-[250px]">
                  Durasi Pinjam Max Asset
                </label>
                <DurationInput name="durationAsset" control={methods.control} />
              </div>
            </section>

            {/* Input Manpower */}
            <section className="mb-6">
              <div className="flex gap-2 items-center flex-row">
                <h2 className="text-heading xs semibold-16">Duration Manpower</h2>
                <Tooltip
                  title="Pengaturan untuk berapa lama manpower bisa dibooking oleh pengguna."
                  className="flex items-center bg-[#424242] "
                >
                  <p className="text-[white] ml-1 rounded-full px-1 py-1 bg-[#424242] w-[16px] h-[16px] flex items-center justify-center text-center text-[12px]">
                    i
                  </p>
                </Tooltip>
              </div>
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
