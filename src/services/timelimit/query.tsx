import { AxiosError } from 'axios'
import { apiGetTimeLimit } from './api' // Adjust the import path as needed
import { APIBaseResponse, IPaginationParams } from '@interfaces/api'
import { ITimeLimit } from '@interfaces/time-limit'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useGetTimeLimit = (
  params?: IPaginationParams
): UseQueryResult<APIBaseResponse<ITimeLimit[]>, AxiosError> => {
  return useQuery({
    queryKey: ['timeLimit', params],
    queryFn: () => apiGetTimeLimit(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: previousData => previousData,
  })
}

// Usage example:
// const { data, isLoading, error } = useGetTimeLimit({ page: 1, pageSize: 10 });
