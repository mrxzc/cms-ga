'use client'

// React and Next.js imports
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

// MUI imports
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'

// Form handling imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// Custom components imports
import TextForm from '@components/atoms/Form/TextForm'
import SelectForm from '@components/atoms/Form/SelectForm'

// Interface and service imports
import { OptionItem } from '@interfaces/utils'
import { IDefaultParams } from '@interfaces/api'
import { useGetRoleList } from '@services/account/query'
import { useGetUserDetail } from '@services/user/query'
import { IUpdateUserPayload } from '@interfaces/user-management'
import { useUpdateUserMutation } from '@services/user/mutation'
import { toast } from 'react-toastify'

// Validation schema
const schema = Yup.object().shape({
  isActive: Yup.string().required('Aktif wajib dipilih'),
  code: Yup.string().required('Kode user wajib diisi'),
  name: Yup.string().required('Nama wajib diisi'),
  email: Yup.string().required('Email wajib diisi'),
  noHandphone: Yup.string().required('No. Handphone wajib diisi'),
  tanggalLahir: Yup.string().required('Tanggal Lahir wajib diisi'),
  role: Yup.object().required('Role user wajib dipilih'),
})

export function DetailUser() {
  // Next.js hooks
  const router = useRouter()
  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  // State management
  const [params] = useState<IDefaultParams>({
    search: '',
    page: 1,
    size: 10,
  })
  const [isChecked, setIsChecked] = useState(false)
  const [optionsRole, setOptionsRole] = useState<OptionItem[]>([])
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  // Mutation
  const updateUserMutation = useUpdateUserMutation()

  // Data fetching
  const { data: roleList } = useGetRoleList(params)
  const { data: userDetail } = useGetUserDetail(slug as string)

  // Form handling
  const { handleSubmit, control, setValue, getValues } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  // Breadcrumbs configuration
  const breadcrumbs = [
    <Link href="/user-management" key="1" className="text-extra-small regular-12 text-[#235696] hover:underline">
      User Management - List User
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Detail User
    </Typography>,
  ]

  // Effect hooks for data management
  useEffect(() => {
    if (userDetail?.data) {
      setValue('isActive', userDetail.data.flagActive === true)
      setValue('code', userDetail.data.idUser)
      setValue('name', userDetail.data.nameUser)
      setValue('email', userDetail.data.email)
      setValue('noHandphone', userDetail.data.noHp)
      setValue('tanggalLahir', userDetail.data.birthOfDate)
      const role = optionsRole.find(option => option.label === userDetail?.data?.role?.roleName)
      setValue('role', role)
    }
  }, [userDetail, setValue, optionsRole])

  useEffect(() => {
    setValue('isActive', isChecked)
  }, [isChecked, setValue])

  useEffect(() => {
    if (userDetail?.data) {
      setIsChecked(userDetail.data.flagActive)
    }
  }, [userDetail])

  useEffect(() => {
    if (userDetail?.data && !initialDataLoaded) {
      setValue('isActive', userDetail.data.flagActive)
      setInitialDataLoaded(true)
    }
  }, [userDetail, setValue, initialDataLoaded])

  useEffect(() => {
    if (roleList && roleList.data) {
      const transformedOptions: OptionItem[] = roleList.data
        .filter(item => item.flagActive)
        .map(item => ({
          label: item.roleName,
          value: item.noId.toString(),
        }))
      setOptionsRole(transformedOptions)
    }
  }, [roleList])

  const handleUpdateUser = async (data: IUpdateUserPayload) => {
    try {
      const response = await updateUserMutation.mutateAsync(data)
      if (response.status === 'T') {
        toast.success('Pengguna berhasil diperbarui!')
        router.push('/user-management')
      } else {
        toast.error(response.message || 'Gagal memperbarui pengguna.')
      }
    } catch (error) {
      // console.error('Error saat memperbarui pengguna:', error)
      toast.error('Terjadi kesalahan saat memperbarui pengguna.')
    }
  }

  // Form submission handler
  const onSubmit = () => {
    /* ... Your submission logic ... */
    const values = getValues()
    const params: IUpdateUserPayload = {
      flagActive: values.isActive,
      idUser: values.code,
      roleId: values.role.value,
    }

    handleUpdateUser(params)
  }

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-screen w-full overflow-y-auto">
      {/* Breadcrumbs */}
      <div className="bg-white px-4 py-4 rounded-xl mb-4 flex gap-2 items-center ">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      {/* User Detail Form */}
      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Detail User</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Active Status */}
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Aktif</p>
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

          {/* User Code */}
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Kode User</p>
            <TextForm
              control={control}
              name="code"
              fieldInput={{ placeholder: 'Masukkan kode user', disabled: true }}
              className="w-[660px]"
            />
          </div>

          {/* User Name */}
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Nama</p>
            <TextForm
              control={control}
              name="name"
              fieldInput={{ placeholder: 'Masukkan nama user', disabled: true }}
              className="w-[660px]"
            />
          </div>

          {/* User Email */}
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Email</p>
            <TextForm
              control={control}
              name="email"
              fieldInput={{ placeholder: 'Masukkan email user', disabled: true }}
              className="w-[660px]"
            />
          </div>

          {/* User Phone Number */}
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">No Handphone</p>
            <TextForm
              control={control}
              name="noHandphone"
              fieldInput={{ placeholder: 'Masukkan no handphone', disabled: true }}
              className="w-[660px]"
            />
          </div>

          {/* User Birth Date */}
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Tanggal Lahir</p>
            <TextForm
              control={control}
              name="tanggalLahir"
              fieldInput={{ placeholder: 'Masukkan tanggal lahir user', disabled: true }}
              className="w-[660px]"
            />
          </div>

          {/* User Role */}
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Role</p>
            <SelectForm
              control={control}
              name="role"
              placeholder="Pilih role user"
              options={optionsRole}
              setValue={setValue}
              className="w-[660px]"
            />
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end gap-2 items-end">
            <button
              className="bg-[#e5f2fc] text-[#235696] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
              type="button"
              onClick={() => router.push('/user-management')}
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
