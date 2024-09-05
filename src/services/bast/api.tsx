import { APIBaseResponse } from '@interfaces/api'
import { IDetailBastInParams, IDetailBastOutParams, IListBastParams } from '@interfaces/bast'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
import { dummyGetDetailBastIn, dummyGetDetailBastOut, dummyGetListBast } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListBast(params: IListBastParams, idUser: string): Promise<APIBaseResponse<any[]>> {
  return dummyGetListBast()

  const headers = {
    idUser,
  }

  return api.get<any[], APIBaseResponse<any[]>>('/cms/master/bast/list', {
    headers,
    params,
  })
}

export function apiGetDetailBastIn(params: IDetailBastInParams, idUser: string): Promise<APIBaseResponse<any>> {
  return dummyGetDetailBastIn()

  const headers = {
    idUser,
  }

  return api.get<any, APIBaseResponse<any>>('/cms/master/bast/detail/in', {
    headers,
    params,
  })
}

export function apiGetDetailBastOut(params: IDetailBastOutParams, idUser: string): Promise<APIBaseResponse<any>> {
  return dummyGetDetailBastOut()

  const headers = {
    idUser,
  }

  return api.get<any, APIBaseResponse<any>>('/cms/master/bast/detail/out', {
    headers,
    params,
  })
}
