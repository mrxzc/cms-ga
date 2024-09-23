import { APIBaseResponse } from '@interfaces/api'
import { IPayloadCreateTimeLimit, IPayloadUpdateTimeLimit, IResponseUpdateTimeLimit } from '@interfaces/time-limit'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { apiCreateTimeLimit, apiUpdateTimeLimit } from './api'

// Mutation for creating time limit
export const useCreateTimeLimit = (): UseMutationResult<
  APIBaseResponse<IResponseUpdateTimeLimit>,
  Error,
  IPayloadCreateTimeLimit
> => {
  return useMutation({
    mutationFn: (payload: IPayloadCreateTimeLimit) => apiCreateTimeLimit(payload),
  })
}

// Mutation for updating time limit
export const useUpdateTimeLimit = (): UseMutationResult<
  APIBaseResponse<IResponseUpdateTimeLimit>,
  Error,
  IPayloadUpdateTimeLimit
> => {
  return useMutation({
    mutationFn: (payload: IPayloadUpdateTimeLimit) => apiUpdateTimeLimit(payload),
  })
}
