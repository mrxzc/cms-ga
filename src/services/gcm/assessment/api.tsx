import { APIBaseResponse } from '@interfaces/api'
import {
  IAssessmentList,
  IAssessmentData,
  IAssessmentDataParams,
  IUpdateAssessmentCriteriaPayload,
  IInsertAssessmentCriteriaPayload,
  IDeleteAssessmentCriteriaPayload,
  IAssessmentCriteriaResponse,
} from '@interfaces/gcmAssesment'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import {
//   dummyGetAssessmentList,
//   dummyGetAssessmentData,
//   dummyInsertAssessmentCriteria,
//   dummyUpdateAssessmentCriteria,
//   dummyDeleteAssessmentCriteria,
// } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetAssessmentList(): Promise<APIBaseResponse<IAssessmentList[]>> {
  //  // return dummyGetAssessmentList()

  return api.get<IAssessmentList[], APIBaseResponse<IAssessmentList[]>>('/cms/master/assessment/list')
}

export function apiGetAssessmentData(params: IAssessmentDataParams): Promise<APIBaseResponse<IAssessmentData>> {
  //  // return dummyGetAssessmentData()

  return api.get<IAssessmentData, APIBaseResponse<IAssessmentData>>('/cms/master/assessment/data', {
    params,
  })
}

export function apiInsertAssessmentCriteria(
  payload: IInsertAssessmentCriteriaPayload
): Promise<APIBaseResponse<IAssessmentCriteriaResponse>> {
  //  // return dummyInsertAssessmentCriteria()

  return api.post<IAssessmentCriteriaResponse, APIBaseResponse<IAssessmentCriteriaResponse>>(
    '/cms/master/assessment/criteria/insert',
    payload
  )
}

export function apiUpdateAssessmentCriteria(
  payload: IUpdateAssessmentCriteriaPayload
): Promise<APIBaseResponse<IAssessmentCriteriaResponse>> {
  //  // return dummyUpdateAssessmentCriteria()

  return api.post<IAssessmentCriteriaResponse, APIBaseResponse<IAssessmentCriteriaResponse>>(
    '/cms/master/assessment/criteria/update',
    payload
  )
}

export function apiDeleteAssessmentCriteria(payload: IDeleteAssessmentCriteriaPayload): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteAssessmentCriteria()

  return api.post<any, APIBaseResponse<any>>('/cms/master/assessment/criteria/delete', payload)
}
