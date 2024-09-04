'use client'

import IconAssessmentEmpty from '@assets/icons/IconAssessmentEmpty'
import IconChevronBottom from '@assets/icons/IconChevronBottom'
import IconDownload from '@assets/icons/IconDownload'
import IconEditing from '@assets/icons/IconEditing'
import IconPlus from '@assets/icons/IconPlus'
import IconSpinner from '@assets/icons/IconSpinner'
import IconTrashOutline from '@assets/icons/IconTrashOutline'
import confirmationDanger from '@assets/images/ConfirmationDanger.png'
import { Modal } from '@components/atoms/ModalCustom'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  IAssessment,
  IAssessmentDataParams,
  IAssessmentList,
  IDeleteAssessmentCriteriaPayload,
  IInsertAssessmentCriteriaPayload,
  IUpdateAssessmentCriteriaPayload,
} from '@interfaces/assesment'
import { IOTPLoginResponse } from '@interfaces/auth'
import {
  useMutateDeleteAssessmentCriteria,
  useMutateInsertAssessmentCriteria,
  useMutateUpdateAssessmentCriteria,
} from '@services/assessment/mutation'
import { useGetAssessmentData, useGetAssessmentList } from '@services/assessment/query'
import { GetCookie } from '@store/storage'
import { dummiesArray } from '@utils/common'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { insertSchema, updateSchema } from './schema'

export function List() {
  const router = useRouter()

  const dataUser: IOTPLoginResponse = GetCookie('data_user')

  const dropdownContainerRef = useRef<HTMLDivElement>(null)
  const dropdownFormContainerRef = useRef<HTMLDivElement>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isDropdownFormOpen, setIsDropdownFormOpen] = useState<boolean>(false)

  const [isInsertModalOpen, setIsInsertModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const [selectedAssessment, setSelectedAssessment] = useState<IAssessmentDataParams>({
    quarter: 0,
    year: 0,
  })
  const [selectedAssessmentForm, setSelectedAssessmentForm] = useState<IAssessmentDataParams>({
    quarter: 0,
    year: 0,
  })

  const [selectedAssessmentCriteria, setSelectedAssessmentCriteria] = useState<IAssessment>()

  const {
    handleSubmit: handleInsertSubmit,
    control: insertControl,
    formState: { isValid: isInsertValid },
    watch,
    setValue,
    reset: resetInsertForm,
  } = useForm<IInsertAssessmentCriteriaPayload>({
    resolver: yupResolver(insertSchema),
    mode: 'all',
  })

  const {
    handleSubmit: handleUpdateSubmit,
    control: updateControl,
    formState: { isValid: isUpdateValid },
    reset: resetUpdateForm,
  } = useForm<IUpdateAssessmentCriteriaPayload>({
    resolver: yupResolver(updateSchema),
    mode: 'all',
  })

  const {
    data: assessmentList,
    isFetching: isAssessmentListFetching,
    refetch: assessmentListRefect,
  } = useGetAssessmentList('main', dataUser?.idUser)

  const {
    data: assessmentListDropdown,
    isFetching: isAssessmentListDropdownFetching,
    refetch: assessmentListDropdownRefect,
  } = useGetAssessmentList('form', dataUser?.idUser)

  const {
    data: assessmentData,
    isFetching: isAssessmentDataFetching,
    refetch: assessmentDataRefect,
  } = useGetAssessmentData(selectedAssessment, dataUser?.idUser)

  const {
    mutate: mutateInsert,
    isSuccess: isInsertSuccess,
    isPending: isInsertPending,
    reset: insertReset,
  } = useMutateInsertAssessmentCriteria()
  const {
    mutate: mutateUpdate,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
    reset: updateReset,
  } = useMutateUpdateAssessmentCriteria()
  const {
    mutate: mutateDelete,
    isSuccess: isDeleteSuccess,
    isPending: isDeletePending,
    reset: deleteReset,
  } = useMutateDeleteAssessmentCriteria()

  useEffect(() => {
    const handleClick = (event: any) => {
      if (!dropdownContainerRef?.current?.contains(event?.target)) {
        setIsDropdownOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    if (isInsertSuccess) {
      setIsInsertModalOpen(false)
      insertReset()
      resetInsertForm()
    }
    if (isInsertSuccess && selectedAssessment?.year) {
      assessmentDataRefect()
    }
  }, [isInsertSuccess])

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsUpdateModalOpen(false)
      updateReset()
    }
    if (isUpdateSuccess && selectedAssessment?.year) {
      assessmentDataRefect()
    }
  }, [isUpdateSuccess])

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsDeleteModalOpen(false)
      deleteReset()
    }
    if (isDeleteSuccess && selectedAssessment?.year) {
      assessmentDataRefect()
    }
  }, [isDeleteSuccess])

  const onInsertSubmit = (payload: IInsertAssessmentCriteriaPayload) => {
    mutateInsert({ payload, idUser: dataUser?.idUser })
  }

  const onUpdateSubmit = (payload: IUpdateAssessmentCriteriaPayload) => {
    mutateUpdate({ payload, idUser: dataUser?.idUser })
  }

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8">
        <div className="bg-white px-6 py-3 rounded mb-4 flex justify-between">
          <div className="text-extra-small regular-12">Master Data - Manage Penilaian</div>
          <div className="flex">
            <button type="button" className="flex gap-2 items-center text-extra-small regular-12 text-[#252525]">
              <IconDownload className="-mt-0.5" />
              <span>Download</span>
            </button>
            <div className="divider divider-horizontal" />
            <button
              type="button"
              className="flex gap-1.5 items-center text-extra-small regular-12 text-[#252525]"
              onClick={() => {
                setIsInsertModalOpen(true)
              }}
            >
              <IconPlus color="white" className="bg-[#505050] p-1 rounded-full -mt-0.5" width={16} height={16} />
              <span>Add New</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          {/* Controller */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <div
                ref={dropdownContainerRef}
                onKeyDown={() => {}}
                role="button"
                onClick={() => {
                  if (assessmentList?.data?.length) {
                    setIsDropdownOpen(!isDropdownOpen)
                    assessmentListRefect()
                  }
                }}
                className="hover:cursor-pointer custom-dropdown h-[39px] w-[320px] px-3 flex items-center rounded-md relative"
              >
                <div className="text-heading s semibold-18 mt-1 flex-1">
                  {selectedAssessment?.year
                    ? `Master Penilaian CS - ${selectedAssessment?.year} Q${selectedAssessment?.quarter}`
                    : 'Pilih Tahun'}
                </div>

                <IconChevronBottom
                  width={21}
                  height={21}
                  color="#252525"
                  className={`${isDropdownOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}
                ></IconChevronBottom>

                <div
                  className={`${
                    isDropdownOpen ? 'absolute' : 'hidden'
                  } z-[2] left-0 top-11 w-full border border-[#CCCCCC] bg-white py-2 rounded-md max-h-40 overflow-y-auto`}
                >
                  {isAssessmentListFetching && (
                    <>
                      <div className="animate-pulse px-2">
                        {dummiesArray().map(val => (
                          <div key={`loading-${val}`} className="w-full h-6 bg-gray-200 mb-2"></div>
                        ))}
                      </div>
                    </>
                  )}
                  {!isAssessmentListFetching &&
                    assessmentList?.data?.map((assessment: IAssessmentList) => (
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation()
                          setSelectedAssessment({ year: assessment?.year, quarter: assessment?.quarter })
                          setIsDropdownOpen(false)
                        }}
                        key={`assessment-list-${assessment?.assessmentId}`}
                        className={`block w-full text-left  text-paragraph ${
                          selectedAssessment?.year == assessment?.year &&
                          selectedAssessment?.quarter == assessment?.quarter
                            ? 'semibold-16 bg-[#F5FAFF]'
                            : 'regular-16'
                        }  py-1 px-2 mb-1 hover:semibold-16 hover:bg-[#F5FAFF]`}
                      >
                        Master Penilaian CS - {assessment?.year} Q{assessment?.quarter}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {/* Controller */}

          {/* List */}
          {!selectedAssessment?.year && !isAssessmentListFetching ? (
            <>
              <div className="relative mb-6">
                <div className="rounded-lg bg-[#F5F5F5] overflow-auto flex items-center justify-center">
                  <div className="py-10">
                    <div className="text-center">
                      <div className="text-[#404040] font-[16px] leading-[24px] font-semibold mb-1">
                        Silahkan pilih tahun
                      </div>

                      <div className="text-[#404040] font-[14px] leading-[20px]">
                        Pilihlah tahun untuk mendapatkan data.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {isAssessmentListFetching || (selectedAssessment?.year && isAssessmentDataFetching) ? (
            <>
              <div className="relative mb-6">
                <div className="overflow-auto flex items-center justify-center">
                  <div className="flex py-10">
                    <IconSpinner width={80} height={80} className="animate-spin"></IconSpinner>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {selectedAssessment?.year && !isAssessmentDataFetching && !assessmentData?.data?.assessments?.length ? (
            <>
              <div className="relative mb-6">
                <div className="rounded-lg bg-[#F5F5F5] overflow-auto flex items-center justify-center">
                  <div className="flex py-10 space-x-3 items-center">
                    <IconAssessmentEmpty></IconAssessmentEmpty>
                    <div>
                      <div className="text-[#404040] font-[16px] leading-[24px] font-semibold mb-2">Tidak ada data</div>

                      <div className="text-[#404040] font-[14px] leading-[20px]">Belum ada data yang dimasukkan.</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {selectedAssessment?.year && !isAssessmentDataFetching && assessmentData?.data?.assessments?.length ? (
            <div className="overflow-x-auto grid grid-rows-5 grid-flow-col gap-6 auto-cols-max">
              {assessmentData?.data?.assessments?.map(assessment => (
                <div className="min-w-[240px]" key={`assessment-${assessment?.id}`}>
                  <div className="text-paragraph regular-14 text-[#0A0A0A] mb-1">{assessment?.label}</div>
                  <div className="flex items-center space-x-4">
                    <div className="min-w-[240px] rounded-md bg-[#EFF2F5] border border-[#E6E5E6] text-paragraph regular-14 text-[#717171] px-2.5 py-3">
                      {assessment?.criteria?.name}
                    </div>
                    <button
                      onClick={() => {
                        setIsUpdateModalOpen(true)
                        setSelectedAssessmentCriteria(assessment)
                        resetUpdateForm({
                          criteriaId: assessment?.criteria?.id,
                          criteriaName: assessment?.criteria?.name,
                        })
                      }}
                      type="button"
                    >
                      <IconEditing></IconEditing>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDeleteModalOpen(true)
                        setSelectedAssessmentCriteria(assessment)
                      }}
                    >
                      <IconTrashOutline></IconTrashOutline>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {/* List */}

          {/* Insert Modal */}
          <Modal
            isOpen={isInsertModalOpen}
            backdropClick={() => {
              if (!isInsertPending) {
                setIsInsertModalOpen(false)
                setIsDropdownFormOpen(false)
                resetInsertForm()
              }
            }}
          >
            <div className="bg-white relative p-6 rounded-xl justify-center">
              <div className="text-heading m semibold-21 text-[#0A0A0A] mb-6 text-center">New Master Penilaian CS</div>

              <form onSubmit={handleInsertSubmit(onInsertSubmit)}>
                <div className="mb-6">
                  <p className="text-paragraph regular-14 mb-1">
                    Kategori Penilaian <span className="text-red-500">*</span>
                  </p>
                  <Controller
                    control={insertControl}
                    name={'assessmentId'}
                    render={({ formState: { errors } }) => (
                      <div className="col-span-3 relative">
                        <div
                          ref={dropdownFormContainerRef}
                          onKeyDown={() => {}}
                          role="button"
                          onClick={() => {
                            setIsDropdownFormOpen(!isDropdownFormOpen)
                            assessmentListDropdownRefect()
                          }}
                          className="hover:cursor-pointer custom-input border border-[#CCCCCC] h-[36px] w-full px-3 flex items-center rounded-md relative"
                        >
                          <div className="text-paragraph regular-14 w-full mt-1 flex-1">
                            {selectedAssessmentForm?.year
                              ? `Master Penilaian CS - ${selectedAssessmentForm?.year} Q${selectedAssessmentForm?.quarter}`
                              : 'Pilih Kategori Penilaian'}
                          </div>

                          <IconChevronBottom
                            width={21}
                            height={21}
                            className={`${isDropdownFormOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}
                          ></IconChevronBottom>
                          <div
                            className={`${
                              isDropdownFormOpen ? 'absolute' : 'hidden'
                            } z-[3] left-0 top-10 w-full border border-[#CCCCCC] bg-white py-2 rounded-md max-h-40 overflow-y-auto`}
                          >
                            {isAssessmentListDropdownFetching && (
                              <>
                                <div className="animate-pulse px-2">
                                  {dummiesArray().map(val => (
                                    <div key={`loading-${val}`} className="w-full h-6 bg-gray-200 mb-2"></div>
                                  ))}
                                </div>
                              </>
                            )}
                            {!isAssessmentListDropdownFetching &&
                              assessmentListDropdown?.data?.map((assesment: IAssessmentList) => (
                                <button
                                  type="button"
                                  onClick={e => {
                                    e.stopPropagation()
                                    setValue('assessmentId', assesment?.assessmentId, { shouldValidate: true })
                                    setSelectedAssessmentForm({ year: assesment?.year, quarter: assesment?.quarter })
                                    setIsDropdownFormOpen(false)
                                  }}
                                  key={`assesment-form-${assesment?.assessmentId}`}
                                  className={`block w-full text-left  text-paragraph ${
                                    watch('assessmentId') == assesment?.assessmentId
                                      ? 'semibold-14 bg-[#F5FAFF]'
                                      : 'regular-14'
                                  }  py-1 px-2 mb-1 hover:semibold-14 hover:bg-[#F5FAFF]`}
                                >
                                  {`Master Penilaian CS - ${assesment?.year} Q${assesment?.quarter}`}
                                </button>
                              ))}
                          </div>
                        </div>

                        {errors?.['assessmentId']?.message && (
                          <span className="text-xs text-error">{errors?.['assessmentId']?.message?.toString()}</span>
                        )}
                      </div>
                    )}
                  ></Controller>
                </div>

                <div className="mb-6">
                  <p className="text-paragraph regular-14 mb-1">
                    Nama Penilaian <span className="text-red-500">*</span>
                  </p>
                  <Controller
                    defaultValue={''}
                    control={insertControl}
                    name={'criteriaName'}
                    render={({ field, formState: { errors } }) => (
                      <div className="col-span-3">
                        <div className="custom-input border border-[#CCCCCC] h-[36px] w-full px-3 flex items-center rounded-md">
                          <input
                            required
                            placeholder="Isi Nama Penilaian"
                            className="custom-input text-paragraph regular-14 w-full mt-1"
                            type="text"
                            {...field}
                          />
                        </div>
                        {errors?.['criteriaName']?.message && (
                          <span className="text-xs text-error">{errors?.['criteriaName']?.message?.toString()}</span>
                        )}
                      </div>
                    )}
                  ></Controller>
                </div>

                <div className="my-8"></div>

                <div className="flex justify-center gap-2 items-end text-heading xs regular-16">
                  <button
                    disabled={isInsertPending || isInsertSuccess}
                    className={`${
                      isInsertPending || isInsertSuccess ? 'opacity-50' : ''
                    } bg-[#e5f2fc] text-[#235696] flex-1 max-h-[45px] px-12 py-3 rounded-xl`}
                    type="button"
                    onClick={() => {
                      setIsInsertModalOpen(false)
                      resetInsertForm()
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isInsertPending || isInsertSuccess}
                    className={`${
                      isInsertPending || !isInsertValid || isInsertSuccess ? 'opacity-50' : ''
                    } bg-[#235696] text-[#e5f2fc] flex-1 max-h-[45px] px-12 py-3 rounded-xl flex items-center justify-center`}
                    type="submit"
                  >
                    {isInsertPending && <IconSpinner className="animate-spin" />}
                    {!isInsertPending && 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          {/* Insert Modal */}

          {/* Update Modal */}
          <Modal
            isOpen={isUpdateModalOpen}
            backdropClick={() => {
              if (!isUpdatePending) {
                setIsUpdateModalOpen(false)
                resetUpdateForm()
              }
            }}
          >
            <div className="bg-white relative p-6 rounded-xl justify-center">
              <div className="text-heading m semibold-21 text-[#0A0A0A] mb-6 text-center">Edit Master Penilaian CS</div>

              <form onSubmit={handleUpdateSubmit(onUpdateSubmit)}>
                <div className="mb-6">
                  <p className="text-paragraph regular-14 mb-1">
                    Nama Penilaian <span className="text-red-500">*</span>
                  </p>
                  <Controller
                    defaultValue={''}
                    control={updateControl}
                    name={'criteriaName'}
                    render={({ field, formState: { errors } }) => (
                      <div className="col-span-3">
                        <div className="custom-input border border-[#CCCCCC] h-[36px] w-full px-3 flex items-center rounded-md">
                          <input
                            required
                            placeholder="Isi Nama Penilaian"
                            className="custom-input text-paragraph regular-14 w-full mt-1"
                            type="text"
                            {...field}
                          />
                        </div>
                        {errors?.['criteriaName']?.message && (
                          <span className="text-xs text-error">{errors?.['criteriaName']?.message?.toString()}</span>
                        )}
                      </div>
                    )}
                  ></Controller>
                </div>

                <div className="my-8"></div>

                <div className="flex justify-center gap-2 items-end text-heading xs regular-16">
                  <button
                    disabled={isUpdatePending || isUpdateSuccess}
                    className={`${
                      isUpdatePending || isUpdateSuccess ? 'opacity-50' : ''
                    } bg-[#e5f2fc] text-[#235696] flex-1 max-h-[45px] px-12 py-3 rounded-xl`}
                    type="button"
                    onClick={() => {
                      setIsUpdateModalOpen(false)
                      resetUpdateForm()
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isUpdatePending || isUpdateSuccess}
                    className={`${
                      isUpdatePending || !isUpdateValid || isUpdateSuccess ? 'opacity-50' : ''
                    } bg-[#235696] text-[#e5f2fc] flex-1 max-h-[45px] px-12 py-3 rounded-xl flex items-center justify-center`}
                    type="submit"
                  >
                    {isUpdatePending && <IconSpinner className="animate-spin" />}
                    {!isUpdatePending && 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          {/* Update Modal */}

          {/* Delete Modal */}
          <Modal
            isOpen={isDeleteModalOpen}
            backdropClick={() => {
              if (!isDeletePending) {
                setIsDeleteModalOpen(false)
              }
            }}
          >
            <div className="bg-white relative p-6 text-center rounded-xl justify-center">
              <div>
                <Image
                  width={0}
                  height={0}
                  sizes="100"
                  src={confirmationDanger.src}
                  className="mx-auto mb-4 w-28 h-28"
                  alt="confirmation"
                />
              </div>
              <div className="text-heading s semibold-18 text-[#252525] mb-1">Hapus Data</div>
              <div className="text-paragraph regular-14 text-[#717171] mb-8 px-3">
                Apakah kamu yakin untuk menghapus data ini?
              </div>

              <div className="flex justify-center items-center space-x-3">
                <button
                  disabled={isDeletePending || isDeleteSuccess}
                  className={`${
                    isDeletePending || isDeleteSuccess ? 'opacity-50' : ''
                  } text-[#EA394B] border border-[#EA394B] flex-1 max-h-[45px] px-12 py-3 rounded-xl`}
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false)
                  }}
                >
                  Batal
                </button>
                <button
                  disabled={isDeletePending || isDeleteSuccess}
                  className={`${
                    isDeletePending || isDeleteSuccess ? 'opacity-50' : ''
                  } bg-[#EA394B] text-white flex-1 max-h-[45px] px-12 py-3 rounded-xl flex items-center justify-center`}
                  type="button"
                  onClick={() => {
                    if (selectedAssessmentCriteria) {
                      const payload: IDeleteAssessmentCriteriaPayload = {
                        criteriaId: selectedAssessmentCriteria?.criteria?.id,
                      }
                      mutateDelete({ payload, idUser: dataUser?.idUser })
                    }
                  }}
                >
                  {isDeletePending && <IconSpinner color={'#fbfafa'} className="animate-spin" />}
                  {!isDeletePending && 'Ya, Hapus'}
                </button>
              </div>
            </div>
          </Modal>
          {/* Delete Modal */}
        </div>
      </div>
    </div>
  )
}
