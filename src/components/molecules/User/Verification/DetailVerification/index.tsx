'use client'

import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import TextForm from '@components/atoms/Form/TextForm'
import SelectForm from '@components/atoms/Form/SelectForm'
import { OptionItem } from '@interfaces/utils'
import { IDefaultParams } from '@interfaces/api'
import { useGetRoleList } from '@services/account/query'
import { useGetVerificationUserDetail } from '@services/user/query'
import { useApproveUserMutation } from '@services/user/mutation'
import { toast } from 'react-toastify'
import { IApprovalPayload } from '@interfaces/user-management'

// Validation Schema
const schema = Yup.object().shape({
  code: Yup.string().required('Kode User wajib diisi'),
  name: Yup.string().required('Nama wajib diisi'),
  email: Yup.string().required('Email wajib diisi'),
  noHp: Yup.string().required('No. HP wajib diisi'),
  noHandphone: Yup.string().required('No. Handphone wajib diisi'),
  tanggalLahir: Yup.string().required('Tanggal Lahir wajib diisi'),
})

export function DetailVerification() {
  const router = useRouter()
  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  // Form Setup
  const { handleSubmit, control, setValue } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  // State Management
  const [params] = useState<IDefaultParams>({ search: '', page: 1, size: 10 })
  const [optionsRole, setOptionsRole] = useState<OptionItem[]>([])

  // Data Fetching
  const { data: roleList } = useGetRoleList(params)
  const { data: userDetail } = useGetVerificationUserDetail(slug as string)
  const approveUserMutation = useApproveUserMutation()

  // Breadcrumbs
  const breadcrumbs = [
    <Link
      href="/user-management/verification"
      key="1"
      className="text-extra-small regular-12 text-[#235696] hover:underline"
    >
      User Management - List User
    </Link>,
    <Typography key="2" color="text.primary" className="text-extra-small regular-12">
      Detail User
    </Typography>,
  ]

  // Set Form Values
  useEffect(() => {
    if (userDetail?.data) {
      setValue('code', userDetail.data.idUser)
      setValue('name', userDetail.data.nameUser)
      setValue('email', userDetail.data.email)
      setValue('noHandphone', userDetail.data.noHp)
      setValue('tanggalLahir', userDetail.data.birthOfDate)

      const role = optionsRole.find(option => option.label === userDetail.data?.role?.roleName)
      setValue('role', role)
    }
  }, [userDetail, optionsRole, setValue])

  // Set Role Options
  useEffect(() => {
    if (roleList?.data) {
      const transformedOptions: OptionItem[] = roleList.data
        .filter(item => item.flagActive)
        .map(item => ({
          label: item.roleName,
          value: item.noId.toString(),
        }))
      setOptionsRole(transformedOptions)
    }
  }, [roleList])

  // Handle Approval
  const handleApproval = async (isApprove: boolean) => {
    const params: IApprovalPayload = {
      idUser: userDetail?.data?.idUser ?? '',
      flagVerify: isApprove ? 'Y' : 'N',
    }

    try {
      const response = await approveUserMutation.mutateAsync(params)
      if (response.status === 'T') {
        toast.success('Pengguna berhasil disetujui/ditolak!')
        router.push('/user-management/verification')
      } else {
        toast.error(response.message || 'Gagal menyetujui/menolak pengguna.')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menyetujui/menolak pengguna.')
    }
  }

  return (
    <div className="px-4 py-8 bg-[#f6f6f6] h-screen w-full overflow-y-auto">
      <div className="bg-white px-4 py-4 rounded-xl mb-4 flex gap-2 items-center">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl">
        <p className="text-heading s semibold-18 mb-4">Detail User</p>
        <form onSubmit={handleSubmit(() => {})} className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Kode User</p>
            <TextForm
              control={control}
              name="code"
              fieldInput={{ placeholder: 'Masukkan kode user', disabled: true }}
              className="w-[660px]"
            />
          </div>
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Nama</p>
            <TextForm
              control={control}
              name="name"
              fieldInput={{ placeholder: 'Masukkan nama user', disabled: true }}
              className="w-[660px]"
            />
          </div>
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Email</p>
            <TextForm
              control={control}
              name="email"
              fieldInput={{ placeholder: 'Masukkan email user', disabled: true }}
              className="w-[660px]"
            />
          </div>
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">No Handphone</p>
            <TextForm
              control={control}
              name="noHandphone"
              fieldInput={{ placeholder: 'Masukkan no handphone', disabled: true }}
              className="w-[660px]"
            />
          </div>
          <div className="flex items-center">
            <p className="text-paragraph regular-14 w-[160px] mr-10">Tanggal Lahir</p>
            <TextForm
              control={control}
              name="tanggalLahir"
              fieldInput={{ placeholder: 'Masukkan tanggal lahir user', disabled: true }}
              className="w-[660px]"
            />
          </div>
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

          <div className="divider" />

          <div className="flex justify-end gap-2 items-end">
            {userDetail?.data?.verifyStatus !== 'R' && (
              <button
                className="bg-[#d92b41] text-[white] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md"
                type="button"
                onClick={() => handleApproval(false)}
              >
                Reject
              </button>
            )}
            <button
              className="bg-[#235696] text-[#e5f2fc] max-w-[145px] max-h-[45px] px-12 py-3 rounded-md text-center flex justify-center items-center"
              type="button"
              onClick={() => handleApproval(true)}
            >
              Approve
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
