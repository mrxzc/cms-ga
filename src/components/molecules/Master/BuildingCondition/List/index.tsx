'use client'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import IconDeleting from '@assets/icons/IconDeleting'
import IconDownload from '@assets/icons/IconDownload'
import IconEditing from '@assets/icons/IconEditing'
import IconPlus from '@assets/icons/IconPlus'
import TextForm from '@components/atoms/Form/TextForm'
import SelectInput from '@components/atoms/Form/Select'
import { data } from './data'
import { Modal } from '@components/atoms/ModalCustom'

const schema = Yup.object().shape({
  report1: Yup.string().required('Report 1 wajib diisi'),
  report2: Yup.string().required('Report 2 wajib diisi'),
  report3: Yup.string().required('Report 3 wajib diisi'),
  report4: Yup.string().required('Report 4 wajib diisi'),
  report5: Yup.string().required('Report 5 wajib diisi'),
  report6: Yup.string().required('Report 6 wajib diisi'),
  report7: Yup.string().required('Report 7 wajib diisi'),
  report8: Yup.string().required('Report 8 wajib diisi'),
  report9: Yup.string().required('Report 9 wajib diisi'),
  report10: Yup.string().required('Report 10 wajib diisi'),
  namaPenilaian: Yup.string(),
})

export function List() {
  const router = useRouter()
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
  }

  const breadcrumbs = [
    <Link
      underline="none"
      color="black"
      href="/master/building-condition"
      onClick={handleClick}
      key="1"
      className="text-extra-small regular-12"
    >
      Master Data - Manage Kondisi Cabang
    </Link>,
  ]

  const { handleSubmit, control, getValues } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: data,
  })

  const onSubmit = () => {}

  const selectOptions = [
    { value: 'reportq1', label: 'Master Report Kondisi Cabang - Q1' },
    { value: 'reportq2', label: 'Master Report Kondisi Cabang - Q2' },
    { value: 'reportq3', label: 'Master Report Kondisi Cabang - Q3' },
    { value: 'reportq4', label: 'Master Report Kondisi Cabang - Q4' },
  ]

  const [selectedOption, setSelectedOption] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleBackdropClick = () => {
    handleCloseModal()
  }

  const [editingReport, setEditingReport] = useState<any>(null)

  const handleEditClick = (reportName: string) => {
    setEditingReport({
      name: reportName,
      value: getValues(reportName),
    })
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="px-4 py-8 bg-[#f6f6f6] h-full w-full">
        <div className="bg-white px-4 py-4 rounded-xl mb-4 text-[#235696] flex justify-between">
          <Stack spacing={2}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
          <div className="flex">
            <button type="button" className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]">
              <IconDownload />
              Download
            </button>
            <div className="divider lg:divider-horizontal" />
            <button
              type="button"
              className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]"
              onClick={() => router.push('/master/building-condition/add')}
            >
              <IconPlus color="white" className="bg-[#505050] p-1 rounded-full" width={16} height={16} />
              Add New
            </button>
          </div>
        </div>

        <div className="bg-white px-4 py-4 rounded-xl">
          <p className="text-heading s semibold-18 mb-4">Master Data - Manage Kondisi Cabang</p>
          <SelectInput
            options={selectOptions}
            value={selectedOption}
            onChange={(selected: any) => {
              setSelectedOption(selected)
            }}
            isSearchable
            placeholder="Tambah Brand"
            className="max-w-[350px] mr-2 mb-2 text-xl semibold-24"
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-8">
              <div className="flex flex-col gap-2">
                <div>
                  <p>Report 1</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report1"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 1' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button" onClick={() => handleEditClick('report1')}>
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Report 2 */}
                <div>
                  <p>Report 2</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report2"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 2' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button">
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Report 3 */}
                <div>
                  <p>Report 3</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report3"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 3' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button">
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Report 4 */}
                <div>
                  <p>Report 4</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report4"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 4' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button">
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Report 5 */}
                <div>
                  <p>Report 5</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report5"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 5' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button">
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {/* Report 6 */}
                <div>
                  <p>Report 6</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report6"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 6' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button">
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Report 7 */}
                <div>
                  <p>Report 7</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report7"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 7' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button">
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Report 8 */}
                <div>
                  <p>Report 8</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report8"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 8' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button">
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Report 9 */}
                <div>
                  <p>Report 9</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report9"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 9' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button">
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Report 10 */}
                <div>
                  <p>Report 10</p>
                  <div className="flex flex-row items-center gap-2">
                    <TextForm
                      control={control}
                      name="report10"
                      fieldInput={{ type: 'text', disabled: true, placeholder: 'Masukkan Laporan 10' }}
                    />
                    <div className="flex gap-3 items-center justify-center">
                      <button type="button">
                        <IconEditing width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                      <button type="button">
                        <IconDeleting width={20} height={20} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} backdropDismiss backdropClick={handleBackdropClick} isFloating={true}>
        <div className="p-4 bg-white rounded relative">
          <h2 className="text-heading m semibold-21 mb-4">New Master Report Kondisi Cabang Q1</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="namaPenilaian" className="text-sm font-medium">
                Nama Penilaian
              </label>
              <div className="flex items-center">
                <TextForm
                  name="namaPenilaian"
                  className="border-b border-gray-300 focus:border-blue-500 w-full"
                  defaultValue={editingReport?.value}
                  control={control}
                  fieldInput={{ type: 'text', placeholder: 'Masukkan Nama Penilaian' }}
                />
              </div>
            </div>
            <div className="flex justify-center gap-8 items-end">
              <button
                className="bg-[#e5f2fc] text-[#235696] w-full max-h-[45px] px-12 py-3 rounded-md"
                type="button"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button className="bg-[#235696] text-[#e5f2fc] w-full max-h-[45px] px-12 py-3 rounded-md" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
