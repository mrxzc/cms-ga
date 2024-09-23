import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { APIBaseResponse } from '@interfaces/api'
import {
  IApprovalPayload,
  IApprovalResponse,
  IUpdateUserPayload,
  IUserCreatePayload,
  IUserCreateResponse,
  IUserData,
} from '@interfaces/user-management'
import { apiApproveUser, apiCreateUser, apiUpdateUser } from './api'

// Custom hook for creating a new user
export const useCreateUserMutation = () => {
  return useMutation<APIBaseResponse<IUserCreateResponse>, AxiosError, IUserCreatePayload>({
    mutationFn: apiCreateUser,
  })
}

// Custom hook for updating user data
export const useUpdateUserMutation = () => {
  return useMutation<APIBaseResponse<IUserData>, AxiosError, IUpdateUserPayload>({
    mutationFn: apiUpdateUser,
  })
}

// Custom hook for approving or rejecting a user
export const useApproveUserMutation = () => {
  return useMutation<APIBaseResponse<IApprovalResponse>, AxiosError, IApprovalPayload>({
    mutationFn: apiApproveUser,
  })
}
