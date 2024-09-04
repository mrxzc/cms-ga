import {
  IInsertAssessmentCriteriaPayload,
  IUpdateAssessmentCriteriaPayload,
  IDeleteAssessmentCriteriaPayload,
} from '@interfaces/gcmAssesment'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiInsertAssessmentCriteria, apiUpdateAssessmentCriteria, apiDeleteAssessmentCriteria } from './api'

// Insert Assessment Criteria
export const useMutateInsertAssessmentCriteria = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IInsertAssessmentCriteriaPayload; idUser: string }) =>
      apiInsertAssessmentCriteria(payload, idUser),
    onSuccess: () => {
      toast.success('Tambah kriteria berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Tambah kriteria gagal, silahkan coba lagi')
    },
  })
}

// Update Assessment Criteria
export const useMutateUpdateAssessmentCriteria = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IUpdateAssessmentCriteriaPayload; idUser: string }) =>
      apiUpdateAssessmentCriteria(payload, idUser),
    onSuccess: () => {
      toast.success('Edit kriteria berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Edit kriteria gagal, silahkan coba lagi')
    },
  })
}

// Delete Assessment Criteria
export const useMutateDeleteAssessmentCriteria = () => {
  return useMutation({
    mutationFn: async ({ payload, idUser }: { payload: IDeleteAssessmentCriteriaPayload; idUser: string }) =>
      apiDeleteAssessmentCriteria(payload, idUser),
    onSuccess: () => {
      toast.success('Hapus kriteria berhasil')
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Hapus kriteria gagal, silahkan coba lagi')
    },
  })
}
