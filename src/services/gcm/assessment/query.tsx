import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { apiGetAssessmentData, apiGetAssessmentList } from './api'
import { IAssessmentDataParams } from '@interfaces/gcmAssesment'

// Get Assessment List
export const useGetAssessmentList = (key: string) => {
  return useQuery({
    queryKey: ['/cms/master/assessment/list', key],
    queryFn: async () =>
      apiGetAssessmentList().catch((error: Error) => {
        toast.error(error?.message)
      }),
  })
}

// Get Assessment Data
export const useGetAssessmentData = (params: IAssessmentDataParams) => {
  return useQuery({
    queryKey: ['/cms/master/assessment/data', params],
    queryFn: async () =>
      apiGetAssessmentData(params).catch((error: Error) => {
        toast.error(error?.message)
      }),
    enabled: !!params?.year,
  })
}
