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

export function apiGetAssessmentList(idUser: string): Promise<APIBaseResponse<IAssessmentList[]>> {
  //  // return dummyGetAssessmentList()

  const headers = {
    idUser,
  }

  return api.get<IAssessmentList[], APIBaseResponse<IAssessmentList[]>>('/cms/master/assessment/list', {
    headers,
  })
}

export function apiGetAssessmentData(
  params: IAssessmentDataParams,
  idUser: string
): Promise<APIBaseResponse<IAssessmentData>> {
  //  // return dummyGetAssessmentData()

  const headers = {
    idUser,
  }
  return api.get<IAssessmentData, APIBaseResponse<IAssessmentData>>('/cms/master/assessment/data', {
    params,
    headers,
  })
}

export function apiInsertAssessmentCriteria(
  payload: IInsertAssessmentCriteriaPayload,
  idUser: string
): Promise<APIBaseResponse<IAssessmentCriteriaResponse>> {
  //  // return dummyInsertAssessmentCriteria()

  const headers = {
    idUser,
  }
  return api.post<IAssessmentCriteriaResponse, APIBaseResponse<IAssessmentCriteriaResponse>>(
    '/cms/master/assessment/criteria/insert',
    payload,
    { headers }
  )
}

export function apiUpdateAssessmentCriteria(
  payload: IUpdateAssessmentCriteriaPayload,
  idUser: string
): Promise<APIBaseResponse<IAssessmentCriteriaResponse>> {
  //  // return dummyUpdateAssessmentCriteria()

  const headers = {
    idUser,
  }
  return api.post<IAssessmentCriteriaResponse, APIBaseResponse<IAssessmentCriteriaResponse>>(
    '/cms/master/assessment/criteria/update',
    payload,
    { headers }
  )
}

export function apiDeleteAssessmentCriteria(
  payload: IDeleteAssessmentCriteriaPayload,
  idUser: string
): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteAssessmentCriteria()

  const headers = {
    idUser,
  }
  return api.post<any, APIBaseResponse<any>>('/cms/master/assessment/criteria/delete', payload, { headers })
}
